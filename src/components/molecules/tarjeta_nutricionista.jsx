import { Card, Col, Row } from "react-bootstrap";
import Imagen from "../atoms/imagen.jsx";
import Horario from "../atoms/horario.jsx";

function TarjetaNutricionista(props) {
    const nutricionista = props.nutricionista;

    return (
        <Card as="article" className="h-100 border-0 shadow-sm">
            <Card.Body>
                <Row className="g-3 h-100">
                    <Col xs={12} sm={4}>
                        <Imagen
                            src={nutricionista.imagen}
                            alt={`Foto de ${nutricionista.nombre}`}
                            className="w-100 h-100 object-fit-cover"
                        />
                    </Col>

                    <Col xs={12} sm={8}>
                        <Card.Title as="h2" className="h3 fw-bold mb-3">
                            {nutricionista.nombre}
                        </Card.Title>

                        <p className="fw-bold mb-3">
                            Especialidad: {nutricionista.especialidad}
                        </p>

                        <Horario
                            dias={nutricionista.diasAtencion}
                            horaInicio={nutricionista.horaInicio}
                            horaFin={nutricionista.horaFin}
                        />

                        <p className="small mb-0">{nutricionista.descripcion}</p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default TarjetaNutricionista;
