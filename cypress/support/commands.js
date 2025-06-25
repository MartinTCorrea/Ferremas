Cypress.Commands.add('loginAsClient', (username = 'cliente@test.com', password = 'cliente123') => {
    cy.session([username, password], () => {
      cy.visit('/login');
      cy.get('[data-cy="username-input"]').clear().type(username);
      cy.get('[data-cy="password-input"]').clear().type(password);
      cy.get('[data-cy="login-button"]').click();
    });
  });
Cypress.Commands.add('loginAsAdmin', () => {
    cy.visit('/login');
    cy.get('[data-cy="username-input"]').type('ADMIN');
    cy.get('[data-cy="password-input"]').type('admin123');
    cy.get('[data-cy="login-button"]').click();
});


Cypress.Commands.add('addProductToCart', (options = {}) => {
    const {
        productIndex = 0,
        quantity = 1,
        visitTiendaFirst = true
    } = options;

    if (visitTiendaFirst) {
        cy.visit('/tienda');
    }

    for (let i = 0; i < quantity; i++) {
        cy.get('[data-cy="producto-card"]')
        .eq(productIndex)
        .find('[data-cy="add-to-cart-btn"]')
        .click();
        
        cy.get('[data-cy="cart-count"]')
        .should('contain', i + 1);
        
        if (i < quantity - 1) cy.wait(300);
    }
});

Cypress.Commands.add('verifyCartItems', (expectedItems) => {
  cy.openCart();
  
  cy.get('[data-cy="cart-item"]').should('have.length', expectedItems.length);
  expectedItems.forEach((item, index) => {
    cy.get('[data-cy="cart-item"]')
      .eq(index)
      .within(() => {
        cy.get('[data-cy="cart-item-name"]').should('contain', item.name);
        cy.get('[data-cy="cart-item-price"]').should('contain', item.price);
        cy.get('[data-cy="item-quantity"]').should('contain', item.quantity);
      });
  });
  const total = expectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cy.get('[data-cy="cart-total"]').should('contain', total.toFixed(2));
});
Cypress.Commands.add('openCart', () => {
    cy.get('[data-cy="cart-toggle"]').click();
    cy.get('[data-cy="cart-sidebar"]').should('be.visible');
});
  