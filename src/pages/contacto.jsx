import { useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import PlantillaPrincipal from "../components/templates/plantilla_principal.jsx";
import FormularioContacto from "../components/organisms/formulario_contacto.jsx";
import { presentacionContacto } from "../data/contacto.js";

function Contacto({ usuarioActual, onCerrarSesion }) {
    const [enviado, setEnviado] = useState(false);

    return (
        <PlantillaPrincipal usuarioActual={usuarioActual} onCerrarSesion={onCerrarSesion}>
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col xs={12} md={9} lg={7} xl={5}>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <h1 className="h2 text-center text-decoration-underline mb-3">
                                {presentacionContacto.titulo}
                            </h1>

                            <p className="text-center">{presentacionContacto.descripcion}</p>

                            {enviado && (
                                <Alert variant="success" dismissible onClose={() => setEnviado(false)}>
                                    {presentacionContacto.confirmacion}
                                </Alert>
                            )}

                            <FormularioContacto onEnviar={() => setEnviado(true)} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </PlantillaPrincipal>
    );
}

export default Contacto;
