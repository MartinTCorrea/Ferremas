describe('Mi primera prueba', () => {
    it('Visita la página de inicio', () => {
      cy.visit('http://localhost:4200');
      cy.contains('Bienvenido').should('exist');
    });
  });