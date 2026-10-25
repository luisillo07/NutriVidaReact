import { useNavigate } from "react-router-dom";
import NavbarNutriVida from "../organisms/navegacion";
import Footer from "../organisms/footer";

function PlantillaPrincipal({ children }) {
    const navigate = useNavigate();

    return (
        <>
            <div className="pantalla-principal">
                <NavbarNutriVida onNavegar={navigate} />

                <main className="contenido-principal">
                    {children}
                </main>
            </div>

            <Footer onNavegar={navigate} />
        </>
    );
}

export default PlantillaPrincipal;
