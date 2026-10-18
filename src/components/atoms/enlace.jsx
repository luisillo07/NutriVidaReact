function Enlace(props) {
    return (
        <a 
            href={props.href}
            onClick={props.onClick}
            className="link-success text-decoration-none"
        >
            {props.texto}
        </a>
    );
}

export default Enlace;
