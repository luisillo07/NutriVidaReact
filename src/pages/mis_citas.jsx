import { Container } from "react-bootstrap";
import PlantillaPrincipal from "../components/templates/plantilla_principal.jsx";
import ListaCitas from "../components/organisms/lista_citas.jsx";

function MisCitas({ usuarioActual, onCerrarSesion, citas, onReprogramar, onCancelar }) {
    return (
        <PlantillaPrincipal usuarioActual={usuarioActual} onCerrarSesion={onCerrarSesion}>
            <Container className="py-4">
                <h1>Mis citas</h1>

                <p>
                    Aquí podrás consultar, reprogramar y cancelar tus citas.
                </p>
                <ListaCitas citas={citas} usuarioActual={usuarioActual}
                    onReprogramar={onReprogramar} onCancelar={onCancelar} />
            </Container>
        </PlantillaPrincipal>
    );
}

export default MisCitas;
