const PATRON_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PATRON_TELEFONO = /^(\+?56)?\s?9\s?[0-9]{8}$/;

export function validarObligatorio(valor, mensaje = "Este campo es obligatorio.") {
    return valor.trim() === "" ? mensaje : "";
}

export function validarCorreo(valor) {
    return PATRON_CORREO.test(valor.trim()) ? "" : 'Por favor, ingresa un correo electrónico válido. Ej: "usuario@dominio.com"';
}

export function validarTelefono(valor) {
    return PATRON_TELEFONO.test(valor.trim()) ? "" : 'Por favor, ingresa un número de teléfono válido. Ej: "+56912345678" o "912345678"';
}

export function normalizarRut(valor) {
    return valor.replace(/[.\s-]/g, "").toUpperCase();
}

export function validarRut(valor) {
    const rut = normalizarRut(valor);

    if (rut === "") return "Ingresa el RUT del paciente.";
    if (!/^[1-9][0-9]{0,7}[0-9K]$/.test(rut)) {
        return "Ingresa un RUT válido. Ej: 12.345.678-5.";
    }

    const cuerpo = rut.slice(0, -1);
    const digitoIngresado = rut.slice(-1);
    let suma = 0;
    let multiplicador = 2;

    // Módulo 11: recorrer los números de derecha a izquierda, con factores de 2 a 7.
    for (let indice = cuerpo.length - 1; indice >= 0; indice--) {
        suma += Number(cuerpo[indice]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resultado = 11 - (suma % 11);
    let digitoEsperado = String(resultado);
    if (resultado === 11) digitoEsperado = "0";
    if (resultado === 10) digitoEsperado = "K";

    return digitoIngresado === digitoEsperado
        ? ""
        : "El dígito verificador del RUT es incorrecto.";
}
