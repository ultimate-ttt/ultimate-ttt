import * as React from 'react';
import { GameFinishedDisplay } from './GameFinishedDisplay';
import { Winner } from '../../state/AppState';
import { mount } from '@cypress/react';
describe('GameFinishedDisplay', () => {
  it('should change visibility', () => {
    mount(
      <GameFinishedDisplay
        onRestartGame={() => {}}
        isGameFinished={true}
        winner={Winner.Draw}
      />,
    ).then((mountReturn) => {
      cy.findByText(/it's a draw/i).should('be.visible');
      cy.findByRole('button', { name: /play again/i }).should('exist');
      cy.matchImageSnapshot();

      mountReturn.rerender(
        <GameFinishedDisplay
          onRestartGame={() => {}}
          isGameFinished={false}
          winner={Winner.Draw}
        />,
      );

      cy.findByRole('button', { name: /play again/i }).should('not.exist');
      cy.findByText(/it's a draw/i).should('not.be.visible');
      cy.matchImageSnapshot();
    });
  });

  it('should allow clicking restart button', () => {
    mount(
      <GameFinishedDisplay
        onRestartGame={() => {}}
        isGameFinished={true}
        winner={Winner.Cross}
      />,
    );

    const button = cy.findByRole('button', { name: /play again/i });
    button.click();

    cy.matchImageSnapshot();
  });
});
