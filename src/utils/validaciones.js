const PATRON_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PATRON_TELEFONO = /^(\+?56)?\s?9\s?[0-9]{8}$/;

export function validarObligatorio(valor, mensaje = "Este campo es obligatorio.") {
    return valor.trim() === "" ? mensaje : "";
}

export function validarCorreo(valor) {
    return PATRON_CORREO.test(valor.trim()) ? "" : 'Por favor, ingresa un correo electrónico válido. Ej: "usuario@dominio.com"';
}

export function validarTelefono(valor) {
    return PATRON_TELEFONO.test(valor.trim()) ? "" : 'Por favor, ingresa un número de teléfono válido. Ej: "+56912345678" o "912345678"';
}