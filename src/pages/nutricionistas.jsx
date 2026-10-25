import { Container } from "react-bootstrap";
import PlantillaPrincipal from "../components/templates/plantilla_principal.jsx";
import ListaNutricionistas from "../components/organisms/lista_nutricionistas.jsx";
import nutricionistas from "../data/nutricionistas.js";

function Nutricionistas({ usuarioActual, onCerrarSesion }) {

    return (
        <PlantillaPrincipal usuarioActual={usuarioActual} onCerrarSesion={onCerrarSesion}>
            <Container fluid className="px-4 py-4">
                <ListaNutricionistas nutricionistas={nutricionistas} />
            </Container>
        </PlantillaPrincipal>
    );
}

export default Nutricionistas;
