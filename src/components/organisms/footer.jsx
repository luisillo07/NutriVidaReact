import { Container, Row, Col, Nav } from "react-bootstrap";

function Footer({ onNavegar }) {
    function ir(evento, ruta) {
        // Permite abrir el enlace en otra pestaña con Ctrl/Cmd + clic.
        if (evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.altKey) return;
        evento.preventDefault();
        onNavegar(ruta);
    }

    return (
        <footer className="footer-nutrivida">
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>NutriVida</h5>

                        <p>Clínica de Nutrición Especializada en Temuco, comprometida con tu salud y bienestar desde 2016.</p>
                    </Col>

                    <Col md={4}>
                        <h5>Navegación</h5>

                        <Nav className="ms-auto">
                            <Nav.Link href="/" onClick={(evento) => ir(evento, "/")}>Inicio</Nav.Link>

                            <Nav.Link href="/servicios" onClick={(evento) => ir(evento, "/servicios")}>
                                Servicios
                            </Nav.Link>

                            <Nav.Link href="/nosotros" onClick={(evento) => ir(evento, "/nosotros")}>
                                Nosotros
                            </Nav.Link>

                            <Nav.Link href="/nutricionistas" onClick={(evento) => ir(evento, "/nutricionistas")}>
                                Nutricionistas
                            </Nav.Link>

                            <Nav.Link href="/contacto" onClick={(evento) => ir(evento, "/contacto")}>
                                Contacto
                            </Nav.Link>

                            <Nav.Link href="/agendar" onClick={(evento) => ir(evento, "/agendar")}>
                                Agendar cita
                            </Nav.Link>

                            <Nav.Link href="/login" onClick={(evento) => ir(evento, "/login")}>
                                Iniciar sesión
                            </Nav.Link>
                        </Nav>

                    </Col>

                    <Col md={4}>
                        <h5>Ubicación</h5>

                        <iframe
                            className="mapa-ubicacion"
                            title="Ubicación de NutriVida"
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6406.418374455775!2d-72.5920174363592!3d-38.74030187186753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2scl!4v1788549148046!5m2!1ses-419!2scl"
                            width="600"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                        />
                    </Col>
                </Row>

                <hr/>

                <p className="text-center mb-0">
                    © 2026 NutriVida. Todos los derechos reservados.
                </p>
            </Container>
        </footer>
    );
}

export default Footer;