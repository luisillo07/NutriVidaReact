import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

function NavbarNutriVida({ onNavegar, usuarioActual, onCerrarSesion }) {
    function ir(evento, ruta) {
        // Permite abrir el enlace en otra pestaña con Ctrl/Cmd + clic.
        if (evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.altKey) return;
        evento.preventDefault();
        onNavegar(ruta);
    }

    function salir() {
        onCerrarSesion();
        onNavegar("/");
    }

    const rutaCitas = usuarioActual?.rol === "secretaria" ? "/gestion-citas" : "/mis-citas";

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
                        {usuarioActual ? (
                            <NavDropdown title="Mi cuenta" id="menu-cuenta">
                                <NavDropdown.Header>{usuarioActual.nombre}</NavDropdown.Header>
                                <NavDropdown.Item href={rutaCitas} onClick={(evento) => ir(evento, rutaCitas)}>
                                    {usuarioActual.rol === "secretaria" ? "Gestión de citas" : "Mis citas"}
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as="button" type="button" onClick={salir}>
                                    Cerrar sesión
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Nav.Link href="/login" className="navegacion-login" onClick={(evento) => ir(evento, "/login")}>
                                Iniciar sesión
                            </Nav.Link>
                        )}

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
