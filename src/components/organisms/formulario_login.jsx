import { Form } from "react-bootstrap";
import {useState} from "react";
import FormularioCampo from "../molecules/formulario_campo.jsx";
import Boton from "../atoms/boton.jsx";
import Enlace from "../atoms/enlace.jsx";
import {validarCorreo, validarObligatorio} from "../../utils/validaciones.js";
import usuarios from "../../data/usuarios.js";

function FormularioLogin({onIngresar}) {

    const [mensaje, setMensaje] = useState("");
    const [errores, setErrores] = useState({})
    const [correo, setCorreo] = useState("");
    const [contrasenia, setContrasenia] = useState("");

    function envio(evento) {
        evento.preventDefault();
        setMensaje("")

        const nuevosErrores = {
            correo: validarCorreo(correo),
            contrasenia: validarObligatorio(
                contrasenia,
                "Ingresa tu contraseña."
            )
        };

        setErrores(nuevosErrores);

        if (nuevosErrores.correo || nuevosErrores.contrasenia) {
            return;
        }

        const usuarioEncontrado = usuarios.find((usuario) => 
            usuario.correo.toLowerCase() === correo.trim().toLowerCase() &&
            usuario.contrasenia === contrasenia);

        if (!usuarioEncontrado) {
            setMensaje("El correo o contraseña son incorrectos");
            return;
        }

        const datos = {
            id: usuarioEncontrado.id,
            nombre: usuarioEncontrado.nombre,
            rut: usuarioEncontrado.rut,
            correo: usuarioEncontrado.correo,
            rol: usuarioEncontrado.rol};

        onIngresar(datos);

        console.log("Sesión iniciada: ", datos);

    }

    return (
        <Form onSubmit={envio} noValidate>
            <FormularioCampo
                id="email"
                label="Correo electrónico"
                type="email"
                valor={correo}
                onChange={setCorreo}
                error={errores.correo}
            />

            <FormularioCampo
                id="password"
                label="Contraseña"
                type="password"
                valor={contrasenia}
                onChange={setContrasenia}
                error={errores.contrasenia}
            />

            <Boton
                type="submit"
                texto="Iniciar sesión"
            />

            {mensaje && <p role="status">{mensaje}</p>}

            <p className="mt-3 mb-0 text-center">
                ¿No tienes una cuenta?{" "}
                <Enlace
                    href="#"
                    texto="Regístrate"
                />
            </p>
        </Form>
    );
}

export default FormularioLogin;