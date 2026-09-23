import { Container, Row, Col } from "react-bootstrap";
import FormularioLogin from "../components/organisms/formulario_login.jsx";

function Login() {
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
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;