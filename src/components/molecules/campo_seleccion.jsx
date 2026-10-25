import { Form } from "react-bootstrap";

function CampoSeleccion(props) {

    const error = props.error || "";

    return (
        <Form.Group className="mb-3" controlId={props.id}>
            <Form.Label>{props.label}</Form.Label>

            <Form.Select
                isInvalid={error !== ""}
                value={props.valor}
                onChange={(evento) =>
                    props.onChange(evento.target.value)
                }
                required
            >
                <option value="">Selecciona una opción</option>

                {props.opciones.map((opcion) => (
                    <option key={opcion.valor} value={opcion.valor}>
                        {opcion.texto}
                    </option>
                ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
                {error}
            </Form.Control.Feedback>
        </Form.Group>
    );
}

export default CampoSeleccion;