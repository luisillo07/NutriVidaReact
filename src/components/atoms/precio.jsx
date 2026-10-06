function Precio(props) {
    const isValidPrecio =
        typeof props.precio === "number" && Number.isFinite(props.precio);

    const formattedPrecio = isValidPrecio
        ? `$${new Intl.NumberFormat("es-CL", {
        maximumFractionDigits: 0,
        }).format(props.precio)}`
        : "—";

    return (
        <span className={props.className || ""}>
            {formattedPrecio}
        </span>
    );
}

export default Precio;
