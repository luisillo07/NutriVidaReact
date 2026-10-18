import { Col, Container, Row } from "react-bootstrap";

import BloqueTexto from "../molecules/bloque_texto.jsx";
import Imagen from "../atoms/imagen.jsx";

function TextoMasImagen(props) {
    return (
        <section className="section-nosotros">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} className="mb-3">
                        <BloqueTexto
                            titulo={props.titulo}
                            parrafos={props.parrafos}
                        />
                    </Col>

                    <Col xs={12} md={6} className="mb-3">
                        <Imagen
                            src={props.imagen}
                            alt={props.altImagen}
                            className="img-nosotros"
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default TextoMasImagen;