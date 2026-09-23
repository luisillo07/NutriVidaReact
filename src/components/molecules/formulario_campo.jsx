import { Form } from "react-bootstrap";

function FormularioCampo(props) {
    return (
        <Form.Group
            className="mb-3"
            controlId={props.id}
        >
            <Form.Label>
                {props.label}
            </Form.Label>

            <Form.Control
                type={props.type}
                required
            />
        </Form.Group>
    );
}

export default FormularioCampo;