describe("Home Page Navigation with Persistent Login", () => {
    beforeEach(() => {
      cy.login();
    });

    it("should navigate to Calendar page, return to Home, then go to Events page, and log out", () => {
      
      cy.contains("button", "Get Started").click();
      cy.wait(2000);
      cy.url().should("include", "/Calender");
      // on calender viw
      cy.wait(4000);
      cy.get("nav").contains("Home").click();
      cy.url().should("eq", "http://localhost:5173/");

      cy.wait(2000);
      cy.contains("button", "Access Now").click();
      cy.url().should("include", "/Events");

      cy.wait(4000);
      cy.get("nav").contains("Home").click();
      cy.url().should("include", "/");
  
  });
  });
  