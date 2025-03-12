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

 it("it needs to open the event form when clicking a anydate cell", () => {
    cy.get(".fc-daygrid-day").first().click(); 
    cy.wait(1000);
    cy.get(".create-event-container").should("be.visible");
    cy.wait(1000);
  });

  it(" now it should close the form when clicking on the back button", () => {
    cy.get(".fc-daygrid-day").first().click();
    cy.wait(2000);
    cy.get('[data-testid="back-button"]').click();
    cy.wait(1000);
    cy.get(".create-event-container").should("not.exist");
  });

  it("should update the calendar title when changing views", () => {
    cy.get(".fc-toolbar-title").then(($titleBefore) => {
      const initialTitle = $titleBefore.text();
      
      cy.get(".fc-next-button").should("be.visible").click();
      cy.wait(1000);
      cy.get(".fc-next-button").should("be.visible").click();
      cy.wait(1000);
      cy.get(".fc-prev-button").should("be.visible").click();
      cy.wait(1000);
      cy.get(".fc-toolbar-title").should(($titleAfter) => {
        expect($titleAfter.text()).not.to.eq(initialTitle);
      });
    });
  });
  

});