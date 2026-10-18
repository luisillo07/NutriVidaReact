function Horario(props) {
    const texto = `Horario: ${props.dias} de ${props.horaInicio} a ${props.horaFin} hrs`;

    return (
        <p className="horario-nutricionista">
            {texto}
        </p>
    );
}

export default Horario;