//I have created below custom command approach and calling cy.login() in beforeEach function in all specs, cypress usually run this commands.js and then run individual tests 

Cypress.Commands.add("login", () => {
    cy.visit("http://localhost:5173/");
  
    cy.contains("button", "Login").click();
  
    cy.url().should("include", "/UserLogin");
    cy.wait(4000); 
  
    cy.get('input[name="username"]').should("be.visible").type("mohith");
    cy.get('input[name="password"]').should("be.visible").type("mohith");
    cy.wait(2000);
    cy.get("button").contains("Sign In").click();
  
    
    cy.url().should("not.include", "/UserLogin");
  });
  
  Cypress.Commands.add("handleAuthRedirect", (targetUrl) => {
    cy.url().then((url) => {
      if (url.includes("/UserLogin")) {
        cy.login();
        cy.visit(targetUrl);
      }
    });
  });
  