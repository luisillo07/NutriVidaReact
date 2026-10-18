import {Col, Row} from "react-bootstrap";

import TarjetaInformativa from "../molecules/tarjeta_informativa.jsx";

function ListaTarjetaInformativa(props) {
    return (
        <Row>
            {props.tarjetas.map((tarjeta) => (<Col key={tarjeta.titulo}
                                                   xs={12}
                                                   md={6}
                                                   lg={props.columnasLg}
                                                   className="mb-3"
                                              >

                                              <TarjetaInformativa
                                                   titulo={tarjeta.titulo}
                                                   descripcion={tarjeta.descripcion}
                                              />
                                             </Col>
                                             )
                               )
            }
        </Row>
    );
}

export default ListaTarjetaInformativa;