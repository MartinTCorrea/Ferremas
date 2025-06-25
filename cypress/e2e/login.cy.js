describe('Login', () => {
    it('Debería fallar con credenciales incorrectas', () => {
      cy.visit('/login');
      cy.get('[data-cy="username-input"]').type('usuario_invalido');
      cy.get('[data-cy="password-input"]').type('123');
      cy.get('[data-cy="login-button"]').click();
      cy.url().should('include', '/login');
    });
  
    it('Debería redirigir al dashboard con credenciales válidas', () => {
      cy.visit('/login');
      cy.get('[data-cy="username-input"]').type('ADMIN');
      cy.get('[data-cy="password-input"]').type('admin123');
      cy.get('[data-cy="login-button"]').click();
      cy.url().should('include', '/admin');
    });
  });