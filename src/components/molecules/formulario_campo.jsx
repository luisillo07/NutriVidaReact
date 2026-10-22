import { Form } from "react-bootstrap";
import EntradaTexto from "../atoms/entrada_texto.jsx";

function FormularioCampo(props) {
    const error = props.error || "";

    return (
        <Form.Group className="mb-3" controlId={props.id}>
            <Form.Label>{props.label}</Form.Label>

            <EntradaTexto
                as={props.as}
                rows={props.rows}
                type={props.type}
                valor={props.valor}
                onChange={props.onChange ? (evento) => props.onChange(evento.target.value) : undefined}
                invalido={error !== ""}
                valido={props.valido === true}
                required
            />

            <Form.Control.Feedback type="invalid">
                {error}
            </Form.Control.Feedback>
        </Form.Group>
    );
}

export default FormularioCampo;