import { Card } from "react-bootstrap";

import ModalidadCita from "../atoms/modalidad_cita.jsx";
import Precio from "../atoms/precio.jsx";

function TarjetaServicio(props) {
    const servicio = props.servicio;

    return (
        <Card as="article" className="tarjeta-servicio">
            <Card.Body>
                <Card.Title as="h3" className="nombre-servicio">
                    {servicio.nombre}
                </Card.Title>

                <p className="precio-servicio">
                    <strong>Precio:</strong>{" "}
                    <Precio precio={servicio.precio} /></p>

                {servicio.duracion !== "—" && (
                    <p><strong>Duración:</strong> {servicio.duracion}</p>
                )}

                <p><strong>Modalidad:</strong>{" "} <ModalidadCita modalidad={servicio.modalidad} /></p>

                <Card.Text className="info-servicio">
                    {servicio.descripcion}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default TarjetaServicio;
