import { Image } from "react-bootstrap";

function Imagen(props) {
    return (
        <Image
            src={props.src}
            alt={props.alt || ""}
            rounded
            className={props.className || ""}
        />
    );
}

export default Imagen;
