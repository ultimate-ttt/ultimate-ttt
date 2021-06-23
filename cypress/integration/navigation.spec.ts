describe('Navigation', () => {
  // TODO: This test will break when the following issue is fixed: https://github.com/cypress-io/cypress/issues/9173#issuecomment-867346858
  // But that is a good thing as we will then get the real behavior and can also test the closing of the menu!
  it('should allow navigation', () => {
    cy.visit('/');

    cy.findByRole('button', { name: /menu/i }).click();

    cy.findByRole('navigation').within(() => {
      cy.findAllByRole('link').each((el) => {
        let href = el.attr('href');
        expect(href).to.not.be.undefined;
        href = href ?? '';
        if (href.includes('http')) {
          cy.request(href).then((res) => {
            expect(res.status).to.equal(200);
          });
        } else {
          cy.wrap(el).click();
          cy.url().should('include', href);
        }
      });
    });
  });
});

export {};
