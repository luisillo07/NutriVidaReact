import { Navbar, Nav, Container } from "react-bootstrap";

function NavbarNutriVida({ onNavegar }) {
    function ir(evento, ruta) {
        // Permite abrir el enlace en otra pestaña con Ctrl/Cmd + clic.
        if (evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.altKey) return;
        evento.preventDefault();
        onNavegar(ruta);
    }

    return (
        <Navbar expand="lg" className="navegacion-nutrivida">
            <Container>
                <Navbar.Brand href="/" onClick={(evento) => ir(evento, "/")}>
                    NutriVida
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navegacion-nutrivida" />

                <Navbar.Collapse id="navegacion-nutrivida">
                    <Nav className="mx-lg-auto gap-lg-2">
                        <Nav.Link href="/" onClick={(evento) => ir(evento, "/")}>
                            Inicio
                        </Nav.Link>

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
                    </Nav>

                    <Nav className="gap-2 align-items-lg-center mt-3 mt-lg-0">
                        <Nav.Link
                            href="/login"
                            className="navegacion-login"
                            onClick={(evento) => ir(evento, "/login")}
                        >
                            Iniciar sesión
                        </Nav.Link>

                        <Nav.Link
                            href="/agendar"
                            className="navegacion-agendar text-center"
                            onClick={(evento) => ir(evento, "/agendar")}
                        >
                            Agendar cita
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarNutriVida;