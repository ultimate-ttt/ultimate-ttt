import routes from '../../src/routes/routes';

describe('HowToPlay', () => {
  it('should allow clicking through how to play', () => {
    cy.visit(routes.HowToPlay);

    cy.findByRole('button', { name: /next/i }).click();
    cy.findByRole('button', { name: /^x$/i }).should('exist');
    cy.findByRole('alertdialog').matchImageSnapshot('First Step');

    // We can not use howToPlaySteps here because it's a tsx file.
    for (let i = 0; i < 5; i++) {
      cy.findByRole('button', { name: /next/i }).click();
    }

    cy.findByRole('alertdialog').matchImageSnapshot('Last Step');
    cy.findByRole('button', { name: /let's play/i }).click();
    cy.url().should('equal', Cypress.config().baseUrl);
  });

  it('should allow cancel', () => {
    cy.visit(routes.HowToPlay);

    cy.findByRole('button', { name: /cancel/i }).click();

    cy.url().should('equal', Cypress.config().baseUrl);
  });
});
