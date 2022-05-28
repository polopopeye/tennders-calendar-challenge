import { mongoObjectId } from 'features/utils/mongoObjectGenerator';

describe('Create New Truck', () => {
  it('should navigate to create new truck view, create new truck and go back to the index', () => {
    cy.visit('http://localhost:3000/');
    cy.get('h1').should('contain', 'TRUCKS');

    cy.get('#createTruckBtn').should('be.visible');
    cy.get('#createTruckBtn').click({ force: true });

    cy.url().should('include', '/truck/create');

    cy.get('input[placeholder="image src"]')
      .clear()
      .type('https://picsum.photos/seed/test/200/200');
    cy.get('input[placeholder="driver name"]').type('Cypress Test 1');
    cy.get('input[placeholder="company name"]').type('Cypress Test 2');
    cy.get('input[placeholder="plate number"]').type(mongoObjectId());
    cy.get('input[placeholder="country"]').type('Cypress Test 3');
    cy.get('input[placeholder="city"]').type('Cypress Test 4');
    cy.get('#createTruckBtn').click({ force: true });

    cy.url().should('include', '/');
    cy.get('h1').should('contain', 'TRUCKS');
  });
});
