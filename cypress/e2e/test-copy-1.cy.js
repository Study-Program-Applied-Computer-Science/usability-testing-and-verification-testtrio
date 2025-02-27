describe('element is available on UI', () => {
  it('passes', () => {
    cy.visit('http://localhost:9999');
    cy.contains('EventPlanner')
  });
});