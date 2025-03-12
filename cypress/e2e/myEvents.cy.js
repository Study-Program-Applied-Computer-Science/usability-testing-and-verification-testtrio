describe("All tests for mYEvents route tests",()=>{
    beforeEach(()=>{
        cy.login();
        cy.visit("/Events");
        cy.wait(2000);
    });

    it("it tests the searchbar and all filters renders correctly", ()=>{
        cy.get(".search-bar").should("be.visible");
        cy.wait(1000);
        cy.get(".time-dropdown").should("be.visible");
        cy.wait(1000);
        cy.get(".period-dropdown").should("be.visible");
        cy.wait(1000);
        cy.get(".date-picker").should("be.visible");
    });

    it("displaying all created events by user",()=>{
        cy.get(".event-card").should("have.length.greaterThan", 0);
    });

    it("should fetch the current event when searching with created event name",()=>{
        cy.get(".search-bar").type("Bug Fix");
        cy.wait(2000);
        cy.get(".event-card").should("have.length.above", 1);
        cy.get(".event-card").contains("Bug Fix").should("exist");
    });

    it("it opens details form on clicking event card", () =>{
        cy.get(".event-card").first().click();
        cy.wait(1000);
        cy.get(".create-event-container").should("be.visible");

        // handling dynaamic text here below
        cy.get(".create-event-title").invoke("text").then((text)=> {
            expect(text).to.be.oneOf(["Event Details", "Create Event"]);
        });
    });
    it("should allow editing an event title and saving changes", () => {
        cy.get(".event-card").first().click();
        cy.wait(1000);
        cy.get(".create-event-edit").click();
        cy.get(".create-event-input").eq(0).clear().type("Bug Fix Updated");
        cy.wait(1000);
        cy.get(".create-event-submit").click();
        cy.wait(2000);
        cy.get(".event-card").first().contains("Bug Fix Updated").should("exist");
      });

      it("should filter events correctly by entering date", () => {
        cy.get(".date-picker").click();
        cy.wait(500);
        cy.get(".react-datepicker__day--015").click();
        cy.wait(2000);
        cy.get(".event-card").should("have.length.greaterThan", 0);
        cy.get(".event-card").each(($el) => {
          cy.wrap($el).contains("3/15/2025").should("exist");
        });
      });

      it("it will filter events correctly by time", () => {
        cy.get(".time-dropdown").select("1");
        cy.wait(2000);
        cy.get(".event-card").should("have.length.greaterThan", 0);
      });

      it("it filters events correctly by AM/PM selection", () => {
        cy.get(".period-dropdown").select("PM");
        cy.wait(2000);
        cy.get(".event-card").should("have.length.greaterThan", 0);
      });

      it("it should clear the selected date filter", () => {
        cy.get(".date-picker").click();
        cy.wait(500);
        cy.get(".react-datepicker__day--015").click();
        cy.wait(2000);
        cy.get(".clear-date-btn").click();
        cy.wait(2000);
        cy.get(".event-card").should("have.length.greaterThan", 0);
      });
});