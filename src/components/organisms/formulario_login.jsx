import { Form } from "react-bootstrap";
import FormularioCampo from "../molecules/formulario_campo.jsx";
import Boton from "../atoms/boton.jsx";
import Enlace from "../atoms/enlace.jsx";

function FormularioLogin() {
    return (
        <Form>
            <FormularioCampo
                id="email"
                label="Correo electrónico"
                type="email"
            />

            <FormularioCampo
                id="password"
                label="Contraseña"
                type="password"
            />

            <Boton
                type="submit"
                texto="Iniciar sesión"
            />

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