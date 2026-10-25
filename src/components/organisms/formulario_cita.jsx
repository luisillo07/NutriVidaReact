import { useState } from "react";
import { Alert, Form, Row, Col } from "react-bootstrap";
import FormularioCampo from "../molecules/formulario_campo";
import Boton from "../atoms/boton";
import CampoSeleccion from "../molecules/campo_seleccion.jsx";
import nutricionistas from "../../data/nutricionistas.js";
import { normalizarRut } from "../../utils/validaciones.js";
import { DURACION_CITA, obtenerFechaActual, validarSolicitudCita } from "../../utils/citas.js";


function FormularioCita({ citas, onAgendar }) {
    const [nombre, setNombre] = useState("");
    const [rut, setRut] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [nutricionistaCodigo, setNutricionistaCodigo] = useState("");
    const opcionesNutricionistas = nutricionistas.map((nutricionista) => ({
        valor: nutricionista.codigo,
        texto: nutricionista.nombre
    }));
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [motivo, setMotivo] = useState("");
    const [errores, setErrores] = useState({});
    const [resultado, setResultado] = useState(null);
    const profesional = nutricionistas.find((item) => item.codigo === nutricionistaCodigo);


    function envio(evento) {
        evento.preventDefault();
        setResultado(null);

        const datos = {
            nombre,
            rut: normalizarRut(rut),
            correo,
            telefono,
            nutricionistaCodigo,
            fecha,
            hora,
            motivo
        };
        const nuevosErrores = validarSolicitudCita(datos, nutricionistas, citas);
        setErrores(nuevosErrores);

        const hayErrores = Object.values(nuevosErrores).some(
            (error) => error !== ""
        );

        if (hayErrores) {
            return;
        }

        const respuesta = onAgendar(datos);
        setResultado(respuesta);
        if (!respuesta.correcto) {
            setErrores(respuesta.errores || {});
            return;
        }

        setNombre("");
        setRut("");
        setCorreo("");
        setTelefono("");
        setNutricionistaCodigo("");
        setFecha("");
        setHora("");
        setMotivo("");
        setErrores({});
    }

    return (
        <Form onSubmit={envio} noValidate>
            {resultado && (
                <Alert variant={resultado.correcto ? "success" : "danger"} role="status"
                    dismissible onClose={() => setResultado(null)}>
                    {resultado.mensaje}
                </Alert>
            )}

            <fieldset className="mb-4">
                <legend className="h5 mb-3">
                    Datos del paciente
                </legend>

                <Row>
                    <Col xs={12} md={6}>
                        <FormularioCampo
                            id="cita-nombre"
                            label="Nombre completo"
                            type="text"
                            valor={nombre}
                            onChange={setNombre}
                            error={errores.nombre}
                        />
                    </Col>

                    <Col xs={12} md={6}>
                        <FormularioCampo
                            id="cita-rut"
                            label="RUT"
                            type="text"
                            valor={rut}
                            onChange={setRut}
                            error={errores.rut}
                        />
                    </Col>

                    <Col xs={12} md={6}>
                        <FormularioCampo
                            id="cita-correo"
                            label="Correo electrónico"
                            type="email"
                            valor={correo}
                            onChange={setCorreo}
                            error={errores.correo}
                        />
                    </Col>

                    <Col xs={12} md={6}>
                        <FormularioCampo
                            id="cita-telefono"
                            label="Teléfono"
                            type="tel"
                            valor={telefono}
                            onChange={setTelefono}
                            error={errores.telefono}
                        />
                    </Col>
                </Row>
            </fieldset>

            <fieldset className="mb-3">
                <legend className="h5 mb-3">Datos de la cita</legend>
                <CampoSeleccion
                    id="cita-nutricionista"
                    label="Nutricionista"
                    valor={nutricionistaCodigo}
                    onChange={setNutricionistaCodigo}
                    opciones={opcionesNutricionistas}
                    error={errores.nutricionistaCodigo}
                />
                <p className="small text-secondary">
                    Las citas duran {DURACION_CITA} minutos.
                    {profesional && ` Atención: ${profesional.diasAtencion}, de ${profesional.horaInicio} a ${profesional.horaFin}.`}
                </p>
                <Row>
                    <Col xs={12} md={6}>
                        <FormularioCampo
                            id="cita-fecha" label="Fecha" type="date"
                            valor={fecha} onChange={setFecha} error={errores.fecha}
                            min={obtenerFechaActual()}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <FormularioCampo
                            id="cita-hora" label="Hora" type="time"
                            valor={hora} onChange={setHora} error={errores.hora}
                            min={profesional?.horaInicio} max={profesional?.horaFin}
                            step={DURACION_CITA * 60}
                        />
                    </Col>
                </Row>
                <FormularioCampo
                    id="cita-motivo" label="Motivo de consulta" as="textarea" rows={3}
                    valor={motivo} onChange={setMotivo} error={errores.motivo}
                />
            </fieldset>

            <Boton
                type="submit"
                texto="Solicitar cita"
            />

        </Form>
    )
}

export default FormularioCita;
