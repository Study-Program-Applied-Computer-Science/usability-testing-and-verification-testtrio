describe("Tests for Navbar Navigation",() => {
    beforeEach(()=>{
        cy.login();
    });
    it("first it will navigate through navbar", ()=>{
        cy.url().should("eq", "http://localhost:5173/");

        // now it is expecting to be on hoem rout
        cy.get("nav").contains("Home").click();
        cy.url().should("eq", "http://localhost:5173/");

        //now clicks create plan button onm nav to see calender view
        cy.get('[data-testid="Calender_Link"]').click();
        cy.url().should("include", "/calender");
        cy.wait(3000);

        // now it click Events button on nav to see events route UI
        cy.get('[data-testid="Events_Link"]').click();
        cy.url().should("include", "/Events");
        cy.wait(2000);

        // now look for All Events
        cy.contains("button", "All Events").click();
        cy.wait(3000);

        // now go back to home route again
        cy.get("nav").contains("Home").click();
        cy.url().should("eq", "http://localhost:5173/");
        cy.wait(1000);

        //log0t now
        cy.get("button").contains("Logout").click();
        cy.url().should("include", "/UserLogin");
    });
});