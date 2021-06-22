import * as React from 'react';
import { mount } from '@cypress/react';
import { BigBoard } from './BigBoard';
import { Player } from '../../../state/AppState';
import {
  activeBoardsForBoardWithOneMoveMock,
  activeBoardsForBoardWithTwoMovesMock,
  boardWithOneMoveMock,
  boardWithTwoMovesMock,
  crossFinishedBoardMock,
  drawFinishedBoardMock,
} from '../../../mocks';

describe('BigBoard', () => {
  it('One Move', () => {
    mount(
      <BigBoard
        currentPlayer={Player.Circle}
        board={boardWithOneMoveMock}
        activeBoards={activeBoardsForBoardWithOneMoveMock}
      />,
    );

    cy.matchImageSnapshot();
  });

  it('Two Moves', () => {
    mount(
      <BigBoard
        currentPlayer={Player.Cross}
        board={boardWithTwoMovesMock}
        activeBoards={activeBoardsForBoardWithTwoMovesMock}
      />,
    );

    cy.matchImageSnapshot();
  });

  it('Finished Cross', () => {
    mount(
      <BigBoard
        currentPlayer={Player.Cross}
        board={crossFinishedBoardMock}
        activeBoards={[]}
      />,
    );
    cy.matchImageSnapshot();
  });

  it('Finished Draw', () => {
    mount(
      <BigBoard
        currentPlayer={Player.Circle}
        board={drawFinishedBoardMock}
        activeBoards={[]}
      />,
    );
    cy.matchImageSnapshot();
  });
});
