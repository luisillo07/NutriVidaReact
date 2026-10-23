function Horario(props) {
    const texto = `Horario: ${props.dias} de ${props.horaInicio} a ${props.horaFin} hrs`;

    return (
        <p className="mb-3">
            {texto}
        </p>
    );
}

export default Horario;