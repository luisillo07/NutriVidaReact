import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import FormularioLogin from "../components/organisms/formulario_login.jsx";
import Enlace from "../components/atoms/enlace.jsx";

function Login() {
    const navigate = useNavigate();

    function volverAlInicio(evento) {
        if (evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.altKey) return;
        evento.preventDefault();
        navigate("/");
    }

    return (
        <Container
            fluid
            className="min-vh-100 bg-light d-flex align-items-center"
        >
            <Row className="w-100 justify-content-center">
                <Col
                    xs={12}
                    md={6}
                    lg={4}
                >
                    <div className="bg-white p-4 rounded shadow-sm">
                        <h1 className="h3 text-center mb-4">
                            Iniciar sesión
                        </h1>

                        <FormularioLogin />
                        <p className="mt-3 mb-0 text-center">
                            <Enlace href="/" texto="Volver al inicio" onClick={volverAlInicio} />
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
