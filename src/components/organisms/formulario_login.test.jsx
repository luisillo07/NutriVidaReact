import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormularioLogin from './formulario_login.jsx';

describe('FormularioLogin', () => {
    it('07 - rechaza una contraseña incorrecta', async () => {
        const persona = userEvent.setup();
        const onIngresar = vi.fn(); // Registra si el formulario intenta iniciar sesión.
        render(<FormularioLogin onIngresar={onIngresar} />);

        await persona.type(screen.getByLabelText('Correo electrónico'), 'carlospinto@gmail.com');
        await persona.type(screen.getByLabelText('Contraseña'), 'incorrecta');
        await persona.click(screen.getByRole('button', { name: 'Iniciar sesión' }));

        expect(screen.getByRole('status')).toHaveTextContent('El correo o contraseña son incorrectos');
        expect(onIngresar).not.toHaveBeenCalled();
    });

    it('08 - entrega los datos del paciente con credenciales válidas', async () => {
        const persona = userEvent.setup();
        const onIngresar = vi.fn();
        vi.spyOn(console, 'log').mockImplementation(() => {});
        render(<FormularioLogin onIngresar={onIngresar} />);

        await persona.type(screen.getByLabelText('Correo electrónico'), 'carlospinto@gmail.com');
        await persona.type(screen.getByLabelText('Contraseña'), 'carlos1234');
        await persona.click(screen.getByRole('button', { name: 'Iniciar sesión' }));

        expect(onIngresar).toHaveBeenCalledTimes(1);
        expect(onIngresar).toHaveBeenCalledWith({
            id: 'usuario1', nombre: 'Carlos Pinto', rut: '12345678-5',
            correo: 'carlospinto@gmail.com', rol: 'paciente',
        });
    });
});
