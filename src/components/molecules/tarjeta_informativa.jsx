import {Card} from "react-bootstrap";

function TarjetaInformativa(props) {
    return (
        <Card as="article" className="tarjeta-informativa">
            <Card.Body>
                <Card.Title as="h3">{props.titulo}</Card.Title>
                <Card.Text>{props.descripcion}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default TarjetaInformativa;