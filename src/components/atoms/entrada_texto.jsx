import { Form } from "react-bootstrap";

function EntradaTexto(props) {
    const isRequired = props.required === true;

    return (
        <Form.Control
            id = {props.id}
            name = {props.name || props.id}
            type = {props.type || "text"}
            placeholder = {props.placeholder || ""}
            onChange = {props.onChange}
            required = {isRequired}
        />
    );
}

export default EntradaTexto;