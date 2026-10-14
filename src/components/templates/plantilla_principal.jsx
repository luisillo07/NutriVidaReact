import { useNavigate } from "react-router-dom";
import NavbarNutriVida from "../organisms/navegacion";
import Footer from "../organisms/footer";

function PlantillaPrincipal({ children }) {
    const navigate = useNavigate();

    return (
        <>
            <NavbarNutriVida onNavegar={navigate} />

            <main>
                {children}
            </main>

            <Footer onNavegar={navigate} />
        </>
    );
}

export default PlantillaPrincipal;
