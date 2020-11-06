// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => {
  cy.get('[type="email"]').type(email).should('have.value', email)
  cy.get('[type="password"]')
    .type(password)
    .should('have.value', password)
    .type('{enter}')
})

Cypress.Commands.add('register', (username, email, password) => {
  cy.get('[type="text"]').type(username).should('have.value', username)
  cy.get('[type="email"]').type(email).should('have.value', email)
  cy.get('[type="password"]')
    .type(password)
    .should('have.value', password)
    .type('{enter}')
})
