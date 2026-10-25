import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import FormularioCampo from "../molecules/formulario_campo";
import Boton from "../atoms/boton";
import CampoSeleccion from "../molecules/campo_seleccion.jsx";
import nutricionistas from "../../data/nutricionistas.js";
import {validarObligatorio, validarCorreo, validarTelefono, normalizarRut} from "../../utils/validaciones.js";


function FormularioCita() {
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


    function envio(evento) {
        evento.preventDefault();

        const nuevosErrores = {
            nombre: validarObligatorio(nombre),
            rut: validarObligatorio(rut),
            correo: validarCorreo(correo),
            telefono: validarTelefono(telefono),
            nutricionistaCodigo: validarObligatorio(nutricionistaCodigo),
            fecha: validarObligatorio(fecha),
            hora: validarObligatorio(hora),
            motivo: validarObligatorio(motivo)
        };

        setErrores(nuevosErrores);

        const hayErrores = Object.values(nuevosErrores).some(
            (error) => error !== ""
        );

        if (hayErrores) {
            return;
        }

        console.log("Datos de la solicitud:", {
            nombre,
            rut:normalizarRut(rut),
            correo,
            telefono,
            nutricionistaCodigo,
            fecha,
            hora,
            motivo
        });
    }

    return (
        <Form onSubmit={envio} noValidate>

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

            <CampoSeleccion
                id="cita-nutricionista"
                label="Nutricionista"
                valor={nutricionistaCodigo}
                onChange={setNutricionistaCodigo}
                opciones={opcionesNutricionistas}
                error={errores.nutricionistaCodigo}
            />

            <FormularioCampo
                id="cita-fecha"
                label="Fecha"
                type="date"
                valor={fecha}
                onChange={setFecha}
                error={errores.fecha}
            />

            <FormularioCampo
                id="cita-hora"
                label="Hora"
                type="time"
                valor={hora}
                onChange={setHora}
                error={errores.hora}
            />

            <FormularioCampo
                id="cita-motivo"
                label="Motivo de consulta"
                as="textarea"
                rows={3}
                valor={motivo}
                onChange={setMotivo}
                error={errores.motivo}
            />

            <Boton
                type="submit"
                texto="Solicitar cita"
            />

        </Form>
    )
}

export default FormularioCita;