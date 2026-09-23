import { Button } from "react-bootstrap";

function Boton(props) {
    return (
        <Button
            type={props.type || "button"}
            onClick={props.onClick}
            variant="success"
            className="w-100"
        >
            {props.texto}
        </Button>
    );
}

export default Boton;