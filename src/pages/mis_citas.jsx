import { Container } from "react-bootstrap";
import PlantillaPrincipal from "../components/templates/plantilla_principal.jsx";

function MisCitas() {
    return (
        <PlantillaPrincipal>
            <Container className="py-4">
                <h1>Mis citas</h1>

                <p>
                    Aquí podrás consultar, reprogramar y cancelar tus citas.
                </p>
            </Container>
        </PlantillaPrincipal>
    );
}

export default MisCitas;
