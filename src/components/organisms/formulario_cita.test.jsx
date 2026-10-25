import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormularioCita from './formulario_cita.jsx';

describe('FormularioCita', () => {
    it('09 - impide enviar una solicitud vacía', async () => {
        const persona = userEvent.setup();
        const onAgendar = vi.fn();
        render(<FormularioCita citas={[]} onAgendar={onAgendar} />);

        await persona.click(screen.getByRole('button', { name: 'Solicitar cita' }));

        expect(screen.getByText('Ingresa el RUT del paciente.')).toBeInTheDocument();
        expect(onAgendar).not.toHaveBeenCalled();
    });

    it('10 - entrega una solicitud válida con el RUT normalizado', async () => {
        const persona = userEvent.setup();
        const onAgendar = vi.fn().mockReturnValue({ correcto: true, mensaje: 'Solicitud registrada.' });
        render(<FormularioCita citas={[]} onAgendar={onAgendar} />);

        await persona.type(screen.getByLabelText('Nombre completo'), 'Carlos Pinto');
        await persona.type(screen.getByLabelText('RUT'), '12.345.678-5');
        await persona.type(screen.getByLabelText('Correo electrónico'), 'carlospinto@gmail.com');
        await persona.type(screen.getByLabelText('Teléfono'), '912345678');
        await persona.selectOptions(screen.getByLabelText('Nutricionista'), 'NUT001');
        // jsdom no ofrece el calendario nativo: cambiamos el valor del control.
        fireEvent.change(screen.getByLabelText('Fecha'), { target: { value: '2030-01-07' } });
        fireEvent.change(screen.getByLabelText('Hora'), { target: { value: '09:00' } });
        await persona.type(screen.getByLabelText('Motivo de consulta'), 'Evaluación inicial');
        await persona.click(screen.getByRole('button', { name: 'Solicitar cita' }));

        expect(onAgendar).toHaveBeenCalledTimes(1);
        expect(onAgendar).toHaveBeenCalledWith({
            nombre: 'Carlos Pinto', rut: '123456785', correo: 'carlospinto@gmail.com',
            telefono: '912345678', nutricionistaCodigo: 'NUT001',
            fecha: '2030-01-07', hora: '09:00', motivo: 'Evaluación inicial',
        });
    });
});
