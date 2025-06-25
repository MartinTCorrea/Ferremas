describe('Prueba de Login', () => {
    it('Debería loguearse correctamente', () => {
      cy.visit('/login');
      cy.get('[data-cy="username-input"]').type('ADMIN');
      cy.get('[data-cy="password-input"]').type('admin123');
      cy.get('[data-cy="login-button"]').click();
      cy.url().should('include', '/admin'); // Verifica redirección
    });
  });