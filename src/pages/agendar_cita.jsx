import { Container, Row, Col, Card } from "react-bootstrap";
import PlantillaPrincipal from "../components/templates/plantilla_principal.jsx";
import FormularioCita from "../components/organisms/formulario_cita.jsx";

function AgendarCita({ usuarioActual, onCerrarSesion, citas, onAgendar }) {
    return (
        <PlantillaPrincipal usuarioActual={usuarioActual} onCerrarSesion={onCerrarSesion}>
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col xs={12} md={10} lg={8}>
                        <Card className="border-0 shadow-sm rounded-4">
                            <Card.Body className="p-4 p-md-5">
                                <h1 className="h2 mb-2">
                                    Agendar cita
                                </h1>

                                <p className="text-secondary mb-4">
                                    Completa tus datos para solicitar
                                    una atención nutricional.
                                </p>

                                <FormularioCita citas={citas} onAgendar={onAgendar} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </PlantillaPrincipal>
    );
}

export default AgendarCita;
