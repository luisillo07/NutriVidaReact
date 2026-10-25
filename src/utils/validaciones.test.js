import { describe, it, expect } from 'vitest';
import { normalizarRut, validarRut } from './validaciones.js';

describe('normalizarRut', () => {
    it('01 - quita el formato del RUT y convierte la k a mayúscula', () => {
        // Arrange: preparar un único dato de entrada.
        const rut = ' 10.000.013 - k ';
        // Act: ejecutar la función real.
        const resultado = normalizarRut(rut);
        // Assert: comparar con lo esperado.
        expect(resultado).toBe('10000013K');
    });
});

describe('validarRut', () => {
    it('02 - acepta un RUT con dígito verificador correcto', () => {
        // Cadena vacía significa que no hay error. Este caso se usa en la exposición.
        const resultado = validarRut('12.345.678-5');
        expect(resultado).toBe('');
    });

    it('03 - rechaza un RUT con dígito verificador incorrecto', () => {
        const resultado = validarRut('12.345.678-4');
        expect(resultado).toBe('El dígito verificador del RUT es incorrecto.');
    });
});
