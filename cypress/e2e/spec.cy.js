// @ts-nocheck
const lineThroughCss = "line-through solid rgb(26, 32, 44)";

describe("Todo App E2E Test", () => {
  it("check if todo items works correctly", () => {
    cy.visit("/");
    cy.dataCy("todo-item").should("have.length", 4);
    cy.dataCy("todo-item-checkbox").first().click();
    cy.dataCy("todo-item-title").eq(1).click();
    cy.dataCy("todo-item-checkbox")
      .first()
      .within(() => {
        cy.get("input").should("be.checked");
      });
    cy.dataCy("todo-item-title")
      .first()
      .should("have.css", "text-decoration", lineThroughCss);
    cy.dataCy("todo-item-checkbox")
      .eq(1)
      .within(() => {
        cy.get("input").should("be.checked");
      });
    cy.dataCy("todo-item-title")
      .eq(1)
      .should("have.css", "text-decoration", lineThroughCss);
    cy.dataCy("todo-item-delete").last().click();
    cy.dataCy("todo-item").should("have.length", 3);
    cy.dataCy("todo-item").last().should("include.text", "Third item");
  });
});
