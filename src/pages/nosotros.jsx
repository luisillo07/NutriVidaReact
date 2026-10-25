import { Container } from "react-bootstrap";

import BloqueTexto from "../components/molecules/bloque_texto.jsx";
import ListaTarjetaInformativa from "../components/organisms/lista_tarjeta_informativa.jsx";
import TextoMasImagen from "../components/organisms/texto_mas_imagen.jsx";
import PlantillaPublica from "../components/templates/plantilla_principal";
import imagenNosotros from "../assets/nosotros.png";

import { historiaNosotros, presentacionNosotros, tarjetasMisionVision, tarjetasValores} from "../data/nosotros.js";

function Nosotros({ usuarioActual, onCerrarSesion }) {
    return (
        <PlantillaPublica usuarioActual={usuarioActual} onCerrarSesion={onCerrarSesion}>
            <TextoMasImagen
                titulo={presentacionNosotros.titulo}
                parrafos={presentacionNosotros.parrafos}
                imagen={imagenNosotros}
                altImagen="Equipo de NutriVida"
            />

            <section className="historia">
                <Container>
                    <BloqueTexto
                        titulo={historiaNosotros.titulo}
                        parrafos={historiaNosotros.parrafos}
                    />
                </Container>
            </section>

            <section className="mision-vision">
                <Container>
                    <ListaTarjetaInformativa
                        tarjetas={tarjetasMisionVision}
                        columnasLg={6}
                    />
                </Container>
            </section>

            <section className="valores">
                <Container>
                    <h2>Nuestros Valores</h2>
                    <ListaTarjetaInformativa
                        tarjetas={tarjetasValores}
                        columnasLg={4}
                    />
                </Container>
            </section>
        </PlantillaPublica>
    );
}

export default Nosotros;
