import { useNavigate } from "react-router-dom";
import PlantillaPrincipal from "../components/templates/plantilla_principal.jsx";
import Boton from "../components/atoms/boton.jsx";

function NoEncontrada() {
    const navigate = useNavigate();

    return (
        <PlantillaPrincipal>
            <h1>Página no encontrada</h1>
            <p>que no está pesado</p>
            <Boton texto="Volver al inicio" onClick={() => navigate("/")} />
        </PlantillaPrincipal>
    );
}

export default NoEncontrada;
