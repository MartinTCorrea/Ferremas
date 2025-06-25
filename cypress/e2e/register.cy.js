describe('Registro', () => {
    it('Debería mostrar error si el email ya existe', () => {
      cy.visit('/register');
      cy.get('[data-cy="nombre-input"]').type('Juan Pérez');
      cy.get('[data-cy="username-input"]').type('juanperez');
      cy.get('[data-cy="email-input"]').type('admin@example.com');
      cy.get('[data-cy="password-input"]').type('123456');
      cy.get('[data-cy="re_password-input"]').type('123456');
      cy.get('[data-cy="register-button"]').click();
      cy.get('[data-cy="error-message"]').should('contain', 'ya está');
    });
  });