const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200', // URL de tu Angular (ajusta el puerto si es necesario)
    setupNodeEvents(on, config) {
      // Configuraciones adicionales (opcional)
    },
  },
});