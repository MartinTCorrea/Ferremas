describe('Página Tienda', () => {
  beforeEach(() => {
    cy.visit('/tienda');
  });

  it('Debería cargar la página correctamente', () => {
    cy.get('[data-cy="tienda-page"]').should('exist');
    cy.get('[data-cy="productos-grid"]').should('exist');
  });

  it('Debería filtrar productos por categoría', () => {
    cy.get('[data-cy="categoria-filter"]').select('Herramientas');
    cy.get('[data-cy="producto-card"]').each(($card) => {
      cy.wrap($card).find('[data-cy="producto-categoria"]').should('contain', 'Herramientas');
    });
  });

  it('Debería mostrar resultados al buscar', () => {
    cy.get('[data-cy="search-input"]').type('martillo');
    cy.get('[data-cy="producto-nombre"]').first().should('contain', 'Martillo');
  });

  it('Debería ordenar productos por precio', () => {
    cy.get('[data-cy="orden-select"]').select('Precio');

  });

  it('Debería cambiar de página correctamente', () => {
    cy.get('[data-cy="next-page-btn"]').click();
    cy.get('[data-cy="page-indicator"]').should('contain', 'Página 2');
    cy.get('[data-cy="prev-page-btn"]').click();
    cy.get('[data-cy="page-indicator"]').should('contain', 'Página 1');
  });

  it('Debería mostrar mensaje cuando no hay productos', () => {
    cy.get('[data-cy="search-input"]').type('xyz123nonexistent');
    cy.get('[data-cy="no-products-message"]').should('be.visible');
  });

  it('Debería navegar al detalle del producto', () => {
    cy.get('[data-cy="view-detail-btn"]').first().click();
    cy.url().should('include', '/producto/');
  });
});