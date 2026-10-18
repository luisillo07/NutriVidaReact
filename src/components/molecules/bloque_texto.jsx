function BloqueTexto(props) {
    return (
        <article className="bloque-texto">
            <h2>{props.titulo}</h2>
            {props.parrafos.map((parrafo) => (<p key={parrafo.id}>
                                                     {parrafo.texto}
                                             </p>)
                               )
            }
        </article>
    );
}

export default BloqueTexto;