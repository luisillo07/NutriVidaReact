function Precio(props) {
    const precioEsValido =
        Number.isFinite(props.precio) && props.precio >= 0;

    const precio = precioEsValido
        ? `$${props.precio.toLocaleString("es-CL")}`
        : "Precio no disponible";

    return (
        <span className={props.className || ""}>
            {precio}
        </span>
    );
}

export default Precio;
