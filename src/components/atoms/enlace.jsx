function Enlace(props) {
    return (
        <a 
            href={props.href}
            className="link-success text-decoration-none"
        >
            {props.texto}
        </a>
    );
}

export default Enlace;