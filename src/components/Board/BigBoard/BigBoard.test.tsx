import * as React from 'react';
import { render, screen } from '../../../test-utils';
import userEvent from '@testing-library/user-event';
import { BigBoard } from './BigBoard';
import { Player } from '../../../state/AppState';
import { emptyBoardMock, unfinishedBoardMock } from '../../../__mocks__';

test('should render buttons for board', () => {
  const playerMoved = jest.fn(() => {});
  const activeBoards = [{ x: 0, y: 0 }];

  render(
    <BigBoard
      currentPlayer={Player.Cross}
      board={emptyBoardMock}
      activeBoards={activeBoards}
      onPlayerMoved={playerMoved}
    />,
  );

  const buttons = screen.getAllByRole('button');
  const removeExtensions = (str: string) => str.replace(/\..*/, '');
  const buttonContent = buttons.map((b: HTMLElement) =>
    b.textContent !== null ? removeExtensions(b.textContent) : '',
  );
  expect(buttonContent).toHaveLength(9 * 9);
  const expectedContent = Array.from({ length: 9 * 9 }).map((_) => '');
  expect(buttonContent).toEqual(expectedContent);
});

test('allows clicking on buttons without content', () => {
  const playerMoved = jest.fn(() => {});
  const activeBoards = [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
  ];

  render(
    <BigBoard
      currentPlayer={Player.Cross}
      board={unfinishedBoardMock}
      activeBoards={activeBoards}
      onPlayerMoved={playerMoved}
    />,
  );

  const buttonsWithContent = screen.getAllByRole('button', { name: /./ });
  buttonsWithContent.forEach((button) => userEvent.click(button));
  expect(playerMoved).not.toHaveBeenCalled();

  const emptyButtons = screen.getAllByRole('button', { name: /^$/ });
  emptyButtons.forEach((button) => userEvent.click(button));
  expect(playerMoved).toHaveBeenCalledTimes(emptyButtons.length);
});
