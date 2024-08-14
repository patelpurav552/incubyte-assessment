/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

export{}

declare global {
    namespace Cypress {
      interface Chainable {
        logIn(email: string, password:string): () => Object;
      }
    }
  }

//@ts-ignore
Cypress.Commands.add('logIn', (email: string, password: string) => {

    return cy.get('input[id="email"]')
             .should('be.empty')
             .type(email)
             .should('have.value', email)

             .get('input[id="pass"]')
             .eq(0)
             .should('be.empty')
             .type(password)
             .should('have.value', password)

             .get('button[id="send2"]')
             .contains('Sign In')
             .should('have.text', 'Sign In')
             .click();
});


