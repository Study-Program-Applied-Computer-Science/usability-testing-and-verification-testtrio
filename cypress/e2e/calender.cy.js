describe("Calendar Page Tests", () => {
  
    beforeEach(() => {
      cy.login();
      cy.visit("/calender");
    });

    it("shhoult render the calender component",() => {
        cy.wait(2000)
        cy.contains("button", "day").should("be.visible").click({ force: true });
        cy.get(".fc-timeGridDay-button").should("exist");
        // cy.get(".fc-timeGridDay-view").should("exist");
        cy.wait(2000);
        
        cy.contains("button", "week").click({ force: true });
        cy.get(".fc-timeGridWeek-button").should("exist");
        cy.get(".fc-timeGridWeek-view").should("exist");
        cy.wait(2000);

        cy.contains("button", "month").click({ force: true });
        cy.get(".fc-dayGridMonth-button").should("exist");
        cy.get(".fc-dayGridMonth-view").should("exist");
        cy.wait(2000);
 });

 it("should open the event form when clicking a date cell", () => {
    cy.get(".fc-daygrid-day").first().click(); 
    cy.get(".create-event-container").should("be.visible");
  });

  it("should close the form when clicking the back button", () => {
    cy.get(".fc-daygrid-day").first().click();
    cy.get('[data-testid="back-button"]').click();
    cy.get(".create-event-container").should("not.exist");
  });

});