describe('Create New Event', () => {
  it('should navigate to create new event view, create new event and go back to the index', () => {
    cy.visit('http://localhost:3000/');
    cy.get('h1').should('contain', 'TRUCKS');

    cy.get('#createEventBtn').should('be.visible');
    cy.get('#createEventBtn').click({ force: true });

    cy.url().should('include', '/event/create');

    cy.get('#selectTruck')
      .find('option')
      .then(($els) => $els.get(2).setAttribute('selected', 'selected'))
      .parent()
      .trigger('change');

    cy.get('input[placeholder="Event Name"]').type('Cypress Event Test 1');
    cy.get('#selectTime').select('Fulltime');

    cy.get('input[type="date"]')
      .click()
      .type(new Date().toISOString().substring(0, 10));

    cy.get('#createEventBtn').click({ force: true });

    cy.url().should('include', '/');
    cy.get('h1').should('contain', 'TRUCKS');
  });
});
