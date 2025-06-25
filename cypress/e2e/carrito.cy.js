describe('Flujo del Carrito', () => {
    beforeEach(() => {
      cy.loginAsClient();
      cy.visit('/tienda');
    });
  
    it('Debería agregar un producto al carrito y verlo en el sidebar', () => {
      cy.addProductToCart();
      
      cy.verifyCartItems([
        { name: 'Taladro Profesional', price: 89990, quantity: 1 }
      ]);
    });
  
    it('Debería actualizar cantidades en el carrito', () => {
      cy.addProductToCart({ quantity: 2 });
      cy.openCart();
      
      cy.get('[data-cy="increase-quantity"]').first().click();
      cy.get('[data-cy="item-quantity"]').first().should('contain', '3');
      
      cy.get('[data-cy="decrease-quantity"]').first().click();
      cy.get('[data-cy="item-quantity"]').first().should('contain', '2');
    });
  
    it('Debería eliminar un producto del carrito', () => {
      cy.addProductToCart();
      cy.openCart();
      
      cy.get('[data-cy="remove-item"]').click();
      cy.get('[data-cy="cart-item"]').should('not.exist');
      cy.get('[data-cy="cart-count"]').should('contain', '0');
    });
  
    it('Debería calcular correctamente el total', () => {
      cy.addProductToCart({ productIndex: 0 }); 
      cy.addProductToCart({ productIndex: 1, quantity: 2 });
      

      cy.verifyCartItems([
        { name: 'Taladro Profesional', price: 89.99, quantity: 1 },
        { name: 'Martillo', price: 15.99, quantity: 2 }
      ]);
    });
  });