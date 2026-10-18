import { Container } from "react-bootstrap";
import PlantillaPrincipal from "../components/templates/plantilla_principal.jsx";
import ListaNutricionistas from "../components/organisms/lista_nutricionistas.jsx";
import nutricionistas from "../data/nutricionistas.js";

function Nutricionistas() {

    return (
        <PlantillaPrincipal>
            <Container fluid className="pagina-nutricionistas">
                <ListaNutricionistas nutricionistas={nutricionistas} />
            </Container>
        </PlantillaPrincipal>
    );
}

export default Nutricionistas;