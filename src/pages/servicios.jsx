import { Container } from "react-bootstrap";

import ListaServicios from "../components/organisms/lista_servicio.jsx";
import PlantillaPublica from "../components/templates/plantilla_principal";
import servicios from "../data/servicios.js";

function Servicios() {
    return (
        <PlantillaPublica>
            <Container className="pagina-servicios">
                <h1>Servicios y planes</h1>
                <ListaServicios servicios={servicios} />
            </Container>
        </PlantillaPublica>
    );
}

export default Servicios;