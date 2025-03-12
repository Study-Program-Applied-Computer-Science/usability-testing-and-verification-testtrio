describe("Infinite Scroll on MyEvents Page", () => {
    beforeEach(() => {
      cy.login();
      cy.visit("/Events");
    });
  
    it("should show first 5 events and load more on scroll", () => {
      cy.get(".event-card").should("have.length", 5);
      cy.wait(3000)
  
      cy.get("#scrollableDiv").scrollTo("bottom");
      cy.wait(3000);

      cy.get("#scrollableDiv").scrollTo("bottom");
      cy.wait(3000);

      cy.get("#scrollableDiv").scrollTo("bottom");
      cy.wait(3000);
  
      cy.get(".event-card").should("have.length.greaterThan", 5);
    });
  });
  