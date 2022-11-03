describe("HomeView", () => {
  it("enable and disable the search input", () => {
    cy.visit("/");
    cy.contains("h2", "Participants");
    cy.get("input").should(
      "have.value",
      "https://data.sandbox.directory.openbankingbrasil.org.br/participants"
    );
    cy.get("[data-testid=v-search-input]").should("be.disabled");
    cy.get("[data-testid=v-search-edit-button]").click();
    cy.get("[data-testid=v-search-input]").should("not.be.disabled");
  });

  it("search for a participant and have Graph selected", () => {
    cy.visit("/");
    cy.get("#pie-chart").should("exist");
    cy.get("[data-testid=v-grid]").should("not.exist");
    cy.get("[data-testid=v-tab-option]").eq(0).should("have.text", "Graph");
  });

  it("show the grid when clicking on the table button", () => {
    cy.visit("/");
    cy.get("[data-testid=v-grid]").should("not.exist");
    cy.get("[data-testid=v-tab-option]").eq(1).should("have.text", "Data");
    cy.get("[data-testid=v-tab-option]").eq(1).click();
    cy.get("[data-testid=v-grid]").should("exist");
  });

  it("show the alert when changing the search input text to a invalid url", () => {
    cy.visit("/");
    cy.get("[data-testid=v-search-edit-button]").click();
    cy.get("[data-testid=v-search-input]").clear().type("invalid url");
    cy.get("[data-testid=v-search-input]").should("have.value", "invalid url");
    cy.get("[data-testid=v-search-input]").type("{enter}");
    cy.on("window:alert", (txt) => {
      expect(txt).to.contains("Error loading participants; Enter a valid URL");
    });
  });

  it("show the alert when participants endpoint return an error", () => {
    cy.intercept("GET", "https://data.sandbox.directory.openbankingbrasil.org.br/participants", {
      statusCode: 500,
      body: {
        error: "Internal Server Error",
      },
    }).as("participants");

    cy.visit("/");
    cy.wait("@participants");
    cy.on("window:alert", (txt) => {
      expect(txt).to.contains("Error loading participants; Enter a valid URL");
    });
  });
});
