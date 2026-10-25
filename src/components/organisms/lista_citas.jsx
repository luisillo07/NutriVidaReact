import { useState } from "react";
import { Alert, Col, Form, Modal, Row } from "react-bootstrap";
import Boton from "../atoms/boton.jsx";
import FormularioCampo from "../molecules/formulario_campo.jsx";
import TarjetaCita from "../molecules/tarjeta_cita.jsx";
import nutricionistas from "../../data/nutricionistas.js";
import { DURACION_CITA, formatearFechaCita, obtenerFechaActual } from "../../utils/citas.js";

function ListaCitas({ citas, usuarioActual, onConfirmar, onReprogramar, onCancelar, onEliminar }) {
    const [accion, setAccion] = useState(null);
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [errores, setErrores] = useState({});
    const [resultado, setResultado] = useState(null);
    const titulos = {
        confirmar: "Confirmar cita", reprogramar: "Reprogramar cita",
        cancelar: "Cancelar cita", eliminar: "Eliminar cita cancelada"
    };
    const ordenadas = [...citas].sort((a, b) => `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`));
    const profesional = nutricionistas.find((item) => item.codigo === accion?.cita.nutricionistaCodigo);

    function abrirAccion(tipo, cita) {
        setAccion({ tipo, cita });
        setFecha(cita.fecha);
        setHora(cita.hora);
        setErrores({});
        setResultado(null);
    }

    function procesarAccion(evento) {
        evento.preventDefault();
        let respuesta;

        if (accion.tipo === "reprogramar") {
            respuesta = onReprogramar(accion.cita.id, { fecha, hora });
        } else if (accion.tipo === "confirmar") {
            respuesta = onConfirmar(accion.cita.id);
        } else if (accion.tipo === "cancelar") {
            respuesta = onCancelar(accion.cita.id);
        } else {
            respuesta = onEliminar(accion.cita.id);
        }

        setResultado(respuesta);
        setErrores(respuesta.errores || {});
        if (respuesta.correcto) setAccion(null);
    }

    return (
        <>
            {resultado && !accion && (
                <Alert variant={resultado.correcto ? "success" : "danger"} role="status"
                    dismissible onClose={() => setResultado(null)}>
                    {resultado.mensaje}
                </Alert>
            )}

            {citas.length === 0 ? (
                <Alert variant="info" role="status">No hay citas para mostrar.</Alert>
            ) : (
                <Row className="g-4">
                    {ordenadas.map((cita) => (
                        <Col key={cita.id} xs={12} xl={6}>
                            <TarjetaCita cita={cita} usuarioActual={usuarioActual}
                                profesional={nutricionistas.find((item) => item.codigo === cita.nutricionistaCodigo)}
                                onAccion={abrirAccion} />
                        </Col>
                    ))}
                </Row>
            )}

            {accion && (
                <Modal show onHide={() => setAccion(null)} centered>
                    <Form onSubmit={procesarAccion} noValidate>
                        <Modal.Header closeButton>
                            <Modal.Title as="h2" className="h5">{titulos[accion.tipo]}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p className="mb-1"><strong>{accion.cita.nombre}</strong> con {profesional?.nombre}.</p>
                            <p>{formatearFechaCita(accion.cita)}</p>

                            {resultado && !resultado.correcto && (
                                <Alert variant="danger">{resultado.mensaje}
                                    {accion.tipo !== "reprogramar" && Object.values(errores).filter(Boolean).map((error) => (
                                        <p key={error} className="mb-0">{error}</p>
                                    ))}
                                </Alert>
                            )}

                            {accion.tipo === "reprogramar" ? (
                                <>
                                    <p className="small text-secondary">
                                        Atención: {profesional?.diasAtencion}, de {profesional?.horaInicio} a {profesional?.horaFin}.
                                        Cada cita dura {DURACION_CITA} minutos y volverá a quedar Pendiente.
                                    </p>
                                    <FormularioCampo id="reprogramar-fecha" label="Nueva fecha" type="date"
                                        valor={fecha} onChange={setFecha} error={errores.fecha} min={obtenerFechaActual()} />
                                    <FormularioCampo id="reprogramar-hora" label="Nueva hora" type="time"
                                        valor={hora} onChange={setHora} error={errores.hora}
                                        min={profesional?.horaInicio} max={profesional?.horaFin} step={DURACION_CITA * 60} />
                                </>
                            ) : (
                                <p className="mb-0">
                                    {accion.tipo === "confirmar" && "¿Deseas confirmar esta solicitud?"}
                                    {accion.tipo === "cancelar" && "¿Deseas cancelar esta cita? El horario quedará disponible."}
                                    {accion.tipo === "eliminar" && "¿Deseas eliminar esta cita cancelada? Esta acción no se puede deshacer."}
                                </p>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Boton texto="Volver" variant="outline-secondary" className="flex-fill"
                                onClick={() => setAccion(null)} />
                            <Boton type="submit" texto={titulos[accion.tipo]} className="flex-fill"
                                variant={["cancelar", "eliminar"].includes(accion.tipo) ? "danger" : "success"} />
                        </Modal.Footer>
                    </Form>
                </Modal>
            )}
        </>
    );
}

export default ListaCitas;
