import * as React from 'react';
import { mount } from '@cypress/react';
import { Player } from '../../../state/AppState';
import { BigBoard } from '../BigBoard/BigBoard';
import { emptyBoardMock } from '../../../mocks';

it('Tile', () => {
  const activeBoards = [{ x: 0, y: 0 }];

  mount(
    <BigBoard
      currentPlayer={Player.Cross}
      board={emptyBoardMock}
      activeBoards={activeBoards}
      onPlayerMoved={() => {}}
    />,
  );
  cy.findByRole('button').click();
});
