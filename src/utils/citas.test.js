import { describe, it, expect } from 'vitest';
import { validarAccionCita, validarHorarioCita } from './citas.js';

// Preparación común: un profesional y una solicitud del lunes a las 09:00.
const profesionales = [{
    codigo: 'NUT001', diasSemana: [1, 3, 5],
    diasAtencion: 'Lunes, Miércoles y Viernes', horaInicio: '09:00', horaFin: '17:00',
}];
const solicitud = {
    rut: '12345678-5', nutricionistaCodigo: 'NUT001', fecha: '2030-01-07', hora: '09:00',
};

describe('validarHorarioCita', () => {
    it('04 - rechaza una fecha que está en el pasado', () => {
        const datos = { ...solicitud, fecha: '2029-12-31' };
        const errores = validarHorarioCita(datos, profesionales);
        expect(errores.fecha).toBe('La fecha no puede estar en el pasado.');
    });

    it('05 - rechaza un horario ocupado del nutricionista', () => {
        const existente = { ...solicitud, id: 'cita-1', rut: '11111111-1', estado: 'Pendiente' };
        const errores = validarHorarioCita(solicitud, profesionales, [existente]);
        expect(errores.hora).toBe('El nutricionista ya tiene una cita en ese horario.');
    });
});

describe('validarAccionCita', () => {
    it('06 - impide que un paciente cancele una cita de otro RUT', () => {
        const cita = { ...solicitud, id: 'cita-1', estado: 'Pendiente' };
        const otroPaciente = { rut: '11111111-1', rol: 'paciente' };
        const mensaje = validarAccionCita(cita, otroPaciente, 'cancelar');
        expect(mensaje).toBe('Solo puedes gestionar tus propias citas.');
    });
});
