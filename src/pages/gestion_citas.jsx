import { Container } from "react-bootstrap";
import PlantillaPrincipal from "../components/templates/plantilla_principal.jsx";

function GestionCitas() {
    return (
        <PlantillaPrincipal>
            <Container className="py-4">
                <h1>Gestión de citas</h1>

                <p>
                    Aquí podrás revisar, confirmar y cancelar las solicitudes
                    de los pacientes.
                </p>
            </Container>
        </PlantillaPrincipal>
    );
}

export default GestionCitas;
