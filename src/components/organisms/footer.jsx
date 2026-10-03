import { Container, Row, Col } from "react-bootstrap";

function Footer() {
    return (
        <footer className="footer-nutrivida">
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>NutriVida</h5>

                        <p>Centro especializado en nutrición y bienestar.</p>
                    </Col>

                    <Col md={4}>
                        <h5>Contacto</h5>

                        <p>Email: contacto@nutrivida.cl</p>
                        <p>Teléfono: +56 9 1234 5678</p>
                    </Col>

                    <Col md={4}>
                        <h5>Horario</h5>

                        <p>Lunes a Viernes</p>
                        <p>09:00 - 18:00</p>
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