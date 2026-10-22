import { useState } from "react";
import { Form } from "react-bootstrap";
import FormularioCampo from "../molecules/formulario_campo.jsx";
import Boton from "../atoms/boton.jsx";
import {validarObligatorio, validarCorreo, validarTelefono} from "../../utils/validaciones.js";

function FormularioContacto(props) {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [errores, setErrores] = useState({});
    const [intentado, setIntentado] = useState(false);

    function manejarEnvio(evento) {
        evento.preventDefault();

        const nuevos = {
            nombre: validarObligatorio(nombre, "Por favor, el nombre no puede estar vacío."),
            correo: validarCorreo(correo),
            telefono: validarTelefono(telefono),
            mensaje: validarObligatorio(mensaje, "El mensaje no puede estar vacío.")
        };
        setErrores(nuevos);
        setIntentado(true);

        const todoCorrecto = Object.values(nuevos).every((error) => error === "");

        if (todoCorrecto) {
            props.onEnviar({
                nombre: nombre.trim(),
                correo: correo.trim(),
                telefono: telefono.trim(),
                mensaje: mensaje.trim()
            });
            setNombre("");
            setCorreo("");
            setTelefono("");
            setMensaje("");
            setErrores({});
            setIntentado(false);
        }
    }

    return (
        <Form onSubmit={manejarEnvio} noValidate>
            <FormularioCampo
                id="contacto-nombre"
                label="Nombre completo"
                type="text"
                valor={nombre}
                onChange={setNombre}
                error={errores.nombre}
                valido={intentado && errores.nombre === ""}
            />

            <FormularioCampo
                id="contacto-correo"
                label="Correo electrónico"
                type="email"
                valor={correo}
                onChange={setCorreo}
                error={errores.correo}
                valido={intentado && errores.correo === ""}
            />

            <FormularioCampo
                id="contacto-telefono"
                label="Teléfono"
                type="tel"
                valor={telefono}
                onChange={setTelefono}
                error={errores.telefono}
                valido={intentado && errores.telefono === ""}
            />

            <FormularioCampo
                id="contacto-mensaje"
                label="Mensaje"
                as="textarea"
                rows={5}
                valor={mensaje}
                onChange={setMensaje}
                error={errores.mensaje}
                valido={intentado && errores.mensaje === ""}
            />

            <Boton
                type="submit"
                texto="Enviar consulta"
            />
        </Form>
    );
}

export default FormularioContacto;