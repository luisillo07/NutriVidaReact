import { Form } from "react-bootstrap";

function EntradaTexto(props) {
    const isRequired = props.required === true;

    return (
        <Form.Control
            id = {props.id}
            name = {props.name || props.id}
            as = {props.as}
            rows = {props.rows}
            type = {props.as ? undefined : (props.type || "text")}
            placeholder = {props.placeholder || ""}
            value = {props.valor}
            onChange = {props.onChange}
            isInvalid = {props.invalido === true}
            isValid = {props.valido === true}
            required = {isRequired}
        />
    );
}

export default EntradaTexto;