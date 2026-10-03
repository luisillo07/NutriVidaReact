import NavbarNutriVida from "../organisms/navegacion";
import Footer from "../organisms/footer";

function PlantillaPrincipal({ children }) {
    return (
        <>
            <NavbarNutriVida />

            <main>
                {children}
            </main>

            <Footer />
        </>
    );
}

export default PlantillaPrincipal;