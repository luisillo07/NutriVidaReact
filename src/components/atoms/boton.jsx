import { Button } from "react-bootstrap";

function Boton(props) {
    return (
        <Button
            type={props.type || "button"}
            onClick={props.onClick}
            variant={props.variant || "success"}
            className={props.className || "w-100"}
            disabled={props.disabled === true}
        >
            {props.texto}
        </Button>
    );
}

export default Boton;
