import Inicio from "./pages/inicio.jsx";
import Nutricionistas from "./pages/nutricionistas.jsx";
import Login from "./pages/login.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NoEncontrada from "./pages/no_encontrada.jsx";
import Nosotros from "./pages/nosotros.jsx";
import Servicios from "./pages/servicios.jsx";
import Contacto from "./pages/contacto.jsx";
import MisCitas from "./pages/mis_citas.jsx";
import GestionCitas from "./pages/gestion_citas.jsx";
import { useState, startTransition } from "react";
import AgendarCita from "./pages/agendar_cita.jsx";
import nutricionistas from "./data/nutricionistas.js";
import { normalizarRut } from "./utils/validaciones.js";
import { validarAccionCita, validarHorarioCita, validarSolicitudCita } from "./utils/citas.js";

function App() {

    const [usuarioActual, setUsuarioActual] = useState(null);
    const [citas, setCitas] = useState([]);

    function cerrarSesion() {
        // Las reservas pertenecen a la aplicación, por eso no se borran al salir.
        // Coordinar el cambio de sesión con la navegación del router.
        startTransition(() => setUsuarioActual(null));
    }

    function agendarCita(datos) {
        const errores = validarSolicitudCita(datos, nutricionistas, citas);
        if (Object.values(errores).some((error) => error !== "")) {
            return { correcto: false, mensaje: "Revisa los datos de la solicitud.", errores };
        }

        const nuevaCita = {
            id: crypto.randomUUID(),
            nombre: datos.nombre.trim(),
            rut: normalizarRut(datos.rut),
            correo: datos.correo.trim().toLowerCase(),
            telefono: datos.telefono.trim(),
            nutricionistaCodigo: datos.nutricionistaCodigo,
            fecha: datos.fecha,
            hora: datos.hora,
            motivo: datos.motivo.trim(),
            fechaSolicitud: new Date().toISOString(),
            estado: "Pendiente"
        };

        setCitas((actuales) => [...actuales, nuevaCita]);
        return { correcto: true, mensaje: "Solicitud registrada. Tu cita está pendiente de confirmación." };
    }

    function reprogramarCita(id, datos) {
        const cita = citas.find((item) => item.id === id);
        const mensaje = validarAccionCita(cita, usuarioActual, "reprogramar");
        if (mensaje) return { correcto: false, mensaje };

        const propuesta = { ...cita, fecha: datos.fecha, hora: datos.hora };
        const errores = validarHorarioCita(propuesta, nutricionistas, citas, id);
        if (Object.values(errores).some((error) => error !== "")) {
            return { correcto: false, mensaje: "Revisa la nueva fecha y hora.", errores };
        }

        setCitas((actuales) => actuales.map((item) => item.id === id
            ? { ...item, fecha: datos.fecha, hora: datos.hora, estado: "Pendiente" }
            : item));
        return { correcto: true, mensaje: "Cita reprogramada. Queda pendiente de una nueva confirmación." };
    }

    function confirmarCita(id) {
        const cita = citas.find((item) => item.id === id);
        const mensaje = validarAccionCita(cita, usuarioActual, "confirmar");
        if (mensaje) return { correcto: false, mensaje };

        const errores = validarHorarioCita(cita, nutricionistas, citas, id);
        if (Object.values(errores).some((error) => error !== "")) {
            return { correcto: false, mensaje: "La cita ya no tiene un horario disponible.", errores };
        }

        setCitas((actuales) => actuales.map((item) => item.id === id
            ? { ...item, estado: "Confirmada" }
            : item));
        return { correcto: true, mensaje: "Cita confirmada." };
    }

    function cancelarCita(id) {
        const cita = citas.find((item) => item.id === id);
        const mensaje = validarAccionCita(cita, usuarioActual, "cancelar");
        if (mensaje) return { correcto: false, mensaje };

        setCitas((actuales) => actuales.map((item) => item.id === id
            ? { ...item, estado: "Cancelada" }
            : item));
        return { correcto: true, mensaje: "Cita cancelada. El horario vuelve a estar disponible." };
    }

    function eliminarCita(id) {
        const cita = citas.find((item) => item.id === id);
        const mensaje = validarAccionCita(cita, usuarioActual, "eliminar");
        if (mensaje) return { correcto: false, mensaje };

        setCitas((actuales) => actuales.filter((item) => item.id !== id));
        return { correcto: true, mensaje: "Cita cancelada eliminada del listado." };
    }

    const citasPaciente = usuarioActual?.rol === "paciente"
        ? citas.filter((cita) => normalizarRut(cita.rut) === normalizarRut(usuarioActual.rut))
        : [];

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inicio usuarioActual={usuarioActual} onCerrarSesion={cerrarSesion} />} />
                <Route path="/nosotros" element={<Nosotros usuarioActual={usuarioActual} onCerrarSesion={cerrarSesion} />} />
                <Route path="/servicios" element={<Servicios usuarioActual={usuarioActual} onCerrarSesion={cerrarSesion} />} />
                <Route path="/contacto" element={<Contacto usuarioActual={usuarioActual} onCerrarSesion={cerrarSesion} />} />
                <Route path="/nutricionistas" element={<Nutricionistas usuarioActual={usuarioActual} onCerrarSesion={cerrarSesion} />} />
                <Route path="/login" element={ <Login usuarioActual={usuarioActual} onIngresar={setUsuarioActual}/>}/>
                <Route path="/agendar" element={
                    <AgendarCita usuarioActual={usuarioActual} onCerrarSesion={cerrarSesion}
                        citas={citas} onAgendar={agendarCita} />
                } />
                <Route path="/mis-citas" element={usuarioActual?.rol === "paciente" ? (
                    <MisCitas usuarioActual={usuarioActual} onCerrarSesion={cerrarSesion}
                        citas={citasPaciente} onReprogramar={reprogramarCita} onCancelar={cancelarCita} />
                ) : <Navigate to="/login" replace />} />
                <Route path="/gestion-citas" element={usuarioActual?.rol === "secretaria" ? (
                    <GestionCitas usuarioActual={usuarioActual} onCerrarSesion={cerrarSesion}
                        citas={citas} onConfirmar={confirmarCita} onCancelar={cancelarCita} onEliminar={eliminarCita} />
                ) : <Navigate to="/login" replace />} />
                <Route path="*" element={<NoEncontrada usuarioActual={usuarioActual} onCerrarSesion={cerrarSesion} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
