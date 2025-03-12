describe("Home Page Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });


  // renders all h1 tags navbar h1 logo and h1 main title
  it("should render the Home component properly", () => {
    cy.get("h1").should("exist").and("be.visible");
  });

  // it renders only main body title
  it("should render the main heading correctly", () => {
    cy.get("h1").should("contain.text", "Personal Event Schedule App!");
  });

  // this test renders h2 tag with description
  it("should render the subheading (h2) correctly", () => {
    cy.get("h2").should("exist").and("be.visible");
  });

  // now it renders footer paragraph tags
  it("should render the description paragraph", () => {
    cy.get("p").should("exist").and("be.visible");
  });

  // it renders image on body
  it("should render images correctly", () => {
    cy.get("img").should("be.visible");
  });

  // this test renders bony buttons "Get Started" "Access Now"
  it("should render navigation buttons properly", () => {
    cy.get("button").contains("Get Started").should("be.visible");
    cy.get("button").contains("Access Now").should("be.visible");
  });

});
