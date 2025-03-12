Cypress.Commands.add("login", () => {
    cy.visit("http://localhost:5173/"); // ✅ Open Home Page
  
    // ✅ Click "Login" button to navigate to the login page
    cy.contains("button", "Login").click();
  
    // ✅ Ensure login page is loaded
    cy.url().should("include", "/UserLogin");
    cy.wait(4000); // ✅ Wait for the page to fully load
  
    // ✅ Enter credentials
    cy.get('input[name="username"]').should("be.visible").type("mohith");
    cy.get('input[name="password"]').should("be.visible").type("mohith");
    cy.wait(2000);
    cy.get("button").contains("Sign In").click();
  
    // ✅ Ensure successful login
    cy.url().should("not.include", "/UserLogin");
  });
  
  // ✅ If redirected to login, re-authenticate and continue
  Cypress.Commands.add("handleAuthRedirect", (targetUrl) => {
    cy.url().then((url) => {
      if (url.includes("/UserLogin")) {
        cy.login(); // ✅ Log in again if redirected
        cy.visit(targetUrl); // ✅ Redirect back to the intended page
      }
    });
  });
  