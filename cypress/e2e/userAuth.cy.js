describe("User Login and Logout", () => {
    beforeEach(() => {
      cy.visit("/UserLogin");
    });
  
    it("should successfully log in and logout the user", () => {
      cy.get('input[name="username"]').type("sai");
      cy.wait(1000);
      cy.get('input[name="password"]').type("sai123");
      cy.wait(500);
      cy.get("button").contains("Sign In").click();
      cy.wait(500);
      cy.url().should("eq", "http://localhost:5173/"); 
      cy.contains("Logout").should("be.visible");
      // now go to calender view for confirming user loggedin
      cy.get('[data-testid="Calender_Link"]').click();
      cy.url().should("include", "/calender");
      cy.wait(3000);

      //log0t now
      cy.get("button").contains("Logout").click();
      cy.url().should("include", "/UserLogin");
    });
  });
  