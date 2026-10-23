import { Col, Row } from "react-bootstrap";
import TarjetaNutricionista from "../molecules/tarjeta_nutricionista.jsx";

function ListaNutricionistas(props) {
    if (props.nutricionistas.length === 0) {
        return <p role="status">No hay nutricionistas disponibles.</p>;
    }

    return (
        <Row className="g-4">
            {props.nutricionistas.map((nutricionista) => (
                <Col key={nutricionista.codigo} xs={12} xl={6}>
                    <TarjetaNutricionista nutricionista={nutricionista} />
                </Col>
            ))}
        </Row>
    );
}

export default ListaNutricionistas;