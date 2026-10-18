import { Card } from "react-bootstrap";
import Imagen from "../atoms/imagen.jsx";
import Horario from "../atoms/horario.jsx";

function TarjetaNutricionista(props) {
    const nutricionista = props.nutricionista;

    return (
        <Card as="article" className="tarjeta-nutricionista">
            <Imagen
                src={nutricionista.imagen}
                alt={`Foto de ${nutricionista.nombre}`}
                className="imagen-nutricionista"
            />

            <Card.Body className="cuerpo-tarjeta-nutricionista">
                <Card.Title as="h2" className="nombre-nutricionista">
                    {nutricionista.nombre}
                </Card.Title>

                <p className="especialidad-nutricionista">
                    Especialidad: {nutricionista.especialidad}
                </p>

                <Horario
                    dias={nutricionista.diasAtencion}
                    horaInicio={nutricionista.horaInicio}
                    horaFin={nutricionista.horaFin}
                />

                <p className="info-nutricionista">{nutricionista.descripcion}</p>
            </Card.Body>
        </Card>
    );
}

export default TarjetaNutricionista;