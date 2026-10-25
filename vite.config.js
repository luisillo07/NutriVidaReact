import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Simula el DOM para dibujar e interactuar con React.
    include: ['src/**/*.test.{js,jsx}'],
    setupFiles: ['./src/setupTests.js'],
    testTimeout: 15000, // Margen para escribir en formularios al medir cobertura.
    coverage: {
      provider: 'v8',
      // Incluye también archivos sin pruebas: el porcentaje representa todo src.
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/**/*.test.{js,jsx}', 'src/setupTests.js'],
      reporter: ['text', 'html', 'json-summary', 'lcov'],
      reportsDirectory: './coverage',
    },
  },
})
