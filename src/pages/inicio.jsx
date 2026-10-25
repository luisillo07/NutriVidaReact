import { Container, Row, Col } from "react-bootstrap";
import PlantillaPrincipal from "../components/templates/plantilla_principal.jsx";
import Imagen from "../components/atoms/imagen.jsx";
import imagenInicio from "../assets/imagen_inicio.png";

function Inicio({ usuarioActual, onCerrarSesion }) {
    return (
        <PlantillaPrincipal usuarioActual={usuarioActual} onCerrarSesion={onCerrarSesion}>
            <section className="py-5">
                <Container>
                    <Row className="align-items-center g-5">
                        <Col xs={12} lg={6}>
                            <h1 className="inicio-titulo mb-4">
                                Tu bienestar comienza con una
                                nutrición personalizada
                            </h1>

                            <p className="lead text-secondary mb-0">
                                En NutriVida, te acompañamos en el camino
                                hacia una vida más saludable con planes
                                de alimentación diseñados exclusivamente
                                para ti.
                            </p>
                        </Col>

                        <Col xs={12} lg={6}>
                            <Imagen
                                src={imagenInicio}
                                alt="Nutricionista en una consulta de nutrición"
                                className="img-fluid w-100 shadow-sm"
                            />
                        </Col>
                    </Row>
                </Container>
            </section>
        </PlantillaPrincipal>
    );
}

export default Inicio;
