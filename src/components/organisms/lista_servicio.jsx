import { Col, Row } from "react-bootstrap";
import TarjetaServicio from "../molecules/tarjeta_servicio.jsx";

function ListaServicio(props) {
    if (props.servicios.length === 0) {
        return <p role="status">No hay servicios disponibles.</p>;
    }

    return (
        <Row className="g-4">
            {props.servicios.map((servicio) => (<Col key={servicio.codigo} 
                                                     xs={12}
                                                     md={6}
                                                     lg={4}
                                                >
                                                    <TarjetaServicio servicio={servicio} />
                                                </Col>
                                               ))}
        </Row>
    );
}

export default ListaServicios;