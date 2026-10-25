import { Badge, Card } from "react-bootstrap";
import Boton from "../atoms/boton.jsx";
import { formatearFechaCita, validarAccionCita } from "../../utils/citas.js";

function TarjetaCita({ cita, profesional, usuarioActual, onAccion }) {
    const colores = { Pendiente: "warning", Confirmada: "success", Cancelada: "secondary" };
    const puedeConfirmar = validarAccionCita(cita, usuarioActual, "confirmar") === "";
    const puedeReprogramar = validarAccionCita(cita, usuarioActual, "reprogramar") === "";
    const puedeCancelar = validarAccionCita(cita, usuarioActual, "cancelar") === "";
    const puedeEliminar = validarAccionCita(cita, usuarioActual, "eliminar") === "";

    return (
        <Card as="article" className="h-100 border-0 shadow-sm">
            <Card.Body>
                <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
                    <Card.Title as="h2" className="h5 mb-0">
                        {profesional?.nombre || "Nutricionista no disponible"}
                    </Card.Title>
                    <Badge bg={colores[cita.estado]} text={cita.estado === "Pendiente" ? "dark" : "light"}>
                        {cita.estado}
                    </Badge>
                </div>

                <p><strong>Fecha y hora:</strong>{" "}
                    <time dateTime={`${cita.fecha}T${cita.hora}`}>{formatearFechaCita(cita)}</time>
                </p>
                <p><strong>Paciente:</strong> {cita.nombre}</p>
                <p><strong>RUT:</strong> {cita.rut.slice(0, -1)}-{cita.rut.slice(-1)}</p>
                {usuarioActual.rol === "secretaria" && (
                    <>
                        <p className="text-break"><strong>Correo:</strong> {cita.correo}</p>
                        <p><strong>Teléfono:</strong> {cita.telefono}</p>
                    </>
                )}
                <p className="text-break"><strong>Motivo:</strong> {cita.motivo}</p>

                <div className="d-flex flex-column flex-sm-row gap-2 mt-3">
                    {puedeConfirmar && (
                        <Boton texto="Confirmar" className="flex-fill" onClick={() => onAccion("confirmar", cita)} />
                    )}
                    {puedeReprogramar && (
                        <Boton texto="Reprogramar" variant="outline-success" className="flex-fill"
                            onClick={() => onAccion("reprogramar", cita)} />
                    )}
                    {puedeCancelar && (
                        <Boton texto="Cancelar cita" variant="outline-danger" className="flex-fill"
                            onClick={() => onAccion("cancelar", cita)} />
                    )}
                    {puedeEliminar && (
                        <Boton texto="Eliminar" variant="danger" className="flex-fill"
                            onClick={() => onAccion("eliminar", cita)} />
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}

export default TarjetaCita;
