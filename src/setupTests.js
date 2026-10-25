import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';

beforeEach(() => {
    // Fijamos solo Date: las citas de prueba no envejecen con el calendario real.
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date(2030, 0, 7, 8, 0)); // Lunes, 08:00 locales.
});

afterEach(() => {
    cleanup(); // Cada caso empieza sin componentes de la prueba anterior.
    vi.useRealTimers();
    vi.restoreAllMocks();
});
