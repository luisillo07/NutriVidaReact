import {normalizarRut, validarCorreo, validarObligatorio, validarRut, validarTelefono} from "./validaciones.js";

export const DURACION_CITA = 30;

export function horaAMinutos(hora) {
    const [horas, minutos] = hora.split(":").map(Number);
    return horas * 60 + minutos;
}

export function obtenerFechaActual(ahora = new Date()) {
    const mes = String(ahora.getMonth() + 1).padStart(2, "0");
    const dia = String(ahora.getDate()).padStart(2, "0");
    return `${ahora.getFullYear()}-${mes}-${dia}`;
}

export function obtenerFechaHoraCita(fecha, hora) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(hora)) {
        return null;
    }

    // Sin "Z": la fecha y la hora se interpretan en la zona local del navegador.
    const instante = new Date(`${fecha}T${hora}:00`);
    const [anio, mes, dia] = fecha.split("-").map(Number);
    if (
        !Number.isFinite(instante.getTime()) ||
        instante.getFullYear() !== anio || instante.getMonth() !== mes - 1 ||
        instante.getDate() !== dia ||
        instante.getHours() * 60 + instante.getMinutes() !== horaAMinutos(hora)
    ) return null;

    return instante;
}

export function esCitaFutura(cita, ahora = new Date()) {
    const instante = obtenerFechaHoraCita(cita.fecha, cita.hora);
    return instante !== null && instante > ahora;
}

export function formatearFechaCita(cita) {
    const instante = obtenerFechaHoraCita(cita.fecha, cita.hora);
    return instante ? instante.toLocaleString("es-CL", {
        dateStyle: "long", timeStyle: "short"
    }) : "Fecha no válida";
}

export function validarHorarioCita(datos, profesionales, citas = [], idExcluido = null, ahora = new Date()) {
    const errores = {
        nutricionistaCodigo: validarObligatorio(datos.nutricionistaCodigo),
        fecha: validarObligatorio(datos.fecha),
        hora: validarObligatorio(datos.hora)
    };
    const profesional = profesionales.find((item) => item.codigo === datos.nutricionistaCodigo);
    if (!errores.nutricionistaCodigo && !profesional) {
        errores.nutricionistaCodigo = "Selecciona un nutricionista disponible.";
    }

    const dia = obtenerFechaHoraCita(datos.fecha, "00:00");
    if (!errores.fecha && !dia) errores.fecha = "Ingresa una fecha válida.";
    if (dia && datos.fecha < obtenerFechaActual(ahora)) {
        errores.fecha = "La fecha no puede estar en el pasado.";
    }
    if (dia && profesional && !profesional.diasSemana.includes(dia.getDay())) {
        errores.fecha = `El profesional atiende ${profesional.diasAtencion.toLowerCase()}.`;
    }

    const instante = obtenerFechaHoraCita(datos.fecha, datos.hora);
    if (!errores.hora && !instante) errores.hora = "Ingresa una hora válida.";
    if (instante && instante <= ahora) errores.hora = "La cita debe tener una fecha y hora futuras.";

    if (instante && profesional) {
        const inicio = horaAMinutos(datos.hora);
        const apertura = horaAMinutos(profesional.horaInicio);
        const cierre = horaAMinutos(profesional.horaFin);
        if (inicio < apertura || inicio + DURACION_CITA > cierre) {
            errores.hora = `La cita debe comenzar y terminar entre ${profesional.horaInicio} y ${profesional.horaFin}.`;
        } else if ((inicio - apertura) % DURACION_CITA !== 0) {
            errores.hora = "Selecciona una hora en bloques de 30 minutos.";
        }
    }

    if (Object.values(errores).some((error) => error !== "")) return errores;

    const inicio = horaAMinutos(datos.hora);
    const citasSuperpuestas = citas.filter((cita) =>
        cita.id !== idExcluido && cita.estado !== "Cancelada" && cita.fecha === datos.fecha &&
        inicio < horaAMinutos(cita.hora) + DURACION_CITA &&
        inicio + DURACION_CITA > horaAMinutos(cita.hora)
    );

    if (citasSuperpuestas.some((cita) => cita.nutricionistaCodigo === datos.nutricionistaCodigo)) {
        errores.hora = "El nutricionista ya tiene una cita en ese horario.";
    } else if (citasSuperpuestas.some((cita) => normalizarRut(cita.rut) === normalizarRut(datos.rut))) {
        errores.hora = "El paciente ya tiene una cita en ese horario.";
    }

    return errores;
}

export function validarSolicitudCita(datos, profesionales, citas = [], ahora = new Date()) {
    return {
        nombre: validarObligatorio(datos.nombre),
        rut: validarRut(datos.rut),
        correo: validarCorreo(datos.correo),
        telefono: validarTelefono(datos.telefono),
        motivo: validarObligatorio(datos.motivo),
        ...validarHorarioCita(datos, profesionales, citas, null, ahora)
    };
}

export function validarAccionCita(cita, usuario, accion, ahora = new Date()) {
    if (!usuario || !["paciente", "secretaria"].includes(usuario.rol)) {
        return "Inicia sesión con una cuenta autorizada.";
    }
    if (!cita) return "La cita ya no existe.";
    if (usuario.rol === "paciente" && normalizarRut(usuario.rut) !== normalizarRut(cita.rut)) {
        return "Solo puedes gestionar tus propias citas.";
    }

    if (accion === "eliminar") {
        if (usuario.rol !== "secretaria") return "Solo la secretaria puede eliminar citas.";
        return cita.estado === "Cancelada" ? "" : "Solo se pueden eliminar citas canceladas.";
    }
    if (accion === "confirmar" && usuario.rol !== "secretaria") {
        return "Solo la secretaria puede confirmar citas.";
    }
    if (accion === "reprogramar" && usuario.rol !== "paciente") {
        return "La reprogramación corresponde al paciente.";
    }
    if (!["confirmar", "cancelar", "reprogramar"].includes(accion)) return "Acción no permitida.";
    if (!["Pendiente", "Confirmada"].includes(cita.estado)) return "La cita ya está cancelada.";
    if (accion === "confirmar" && cita.estado !== "Pendiente") return "La cita ya está confirmada.";
    if (!esCitaFutura(cita, ahora)) return "Solo se pueden modificar citas futuras.";

    return "";
}
