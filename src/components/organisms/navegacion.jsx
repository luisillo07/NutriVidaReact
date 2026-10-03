import { Navbar, Nav, Container } from "react-bootstrap";

function NavbarNutriVida() {
    return (
        <Navbar expand="lg" className="navegacion-nutrivida">
            <Container>
                <Navbar.Brand href="/">
                    NutriVida
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navegacion-nutrivida" />

                <Navbar.Collapse id="navegacion-nutrivida">
                    <Nav className="ms-auto">
                        <Nav.Link href="/">Inicio</Nav.Link>

                        <Nav.Link href="/servicios">
                            Servicios
                        </Nav.Link>

                        <Nav.Link href="/nutricionistas">
                            Nutricionistas
                        </Nav.Link>

                        <Nav.Link href="/agendar">
                            Agendar cita
                        </Nav.Link>

                        <Nav.Link href="/login">
                            Iniciar sesión
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarNutriVida;