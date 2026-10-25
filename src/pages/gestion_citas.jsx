import { Container } from "react-bootstrap";
import PlantillaPrincipal from "../components/templates/plantilla_principal.jsx";
import ListaCitas from "../components/organisms/lista_citas.jsx";

function GestionCitas({ usuarioActual, onCerrarSesion, citas, onConfirmar, onCancelar, onEliminar }) {
    return (
        <PlantillaPrincipal usuarioActual={usuarioActual} onCerrarSesion={onCerrarSesion}>
            <Container className="py-4">
                <h1>Gestión de citas</h1>

                <p>
                    Aquí podrás revisar, confirmar y cancelar las solicitudes
                    de los pacientes.
                </p>
                <ListaCitas citas={citas} usuarioActual={usuarioActual}
                    onConfirmar={onConfirmar} onCancelar={onCancelar} onEliminar={onEliminar} />
            </Container>
        </PlantillaPrincipal>
    );
}

export default GestionCitas;
