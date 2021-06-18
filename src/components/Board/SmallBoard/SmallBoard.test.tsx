import * as React from 'react';
import { render, screen } from '../../../test-utils';
import { SmallBoard } from './SmallBoard';
import { Point } from '../../../util';
import { Player, TileValue } from '../../../state/AppState';
import userEvent from '@testing-library/user-event';

function getSmallTile(boardPosition: Point, position: Point, value: TileValue) {
  return {
    boardPosition,
    position,
    value,
  };
}

const boardPosition = { x: 0, y: 0 };
const tiles = [
  getSmallTile(boardPosition, { x: 0, y: 0 }, TileValue.Cross),
  getSmallTile(boardPosition, { x: 0, y: 1 }, TileValue.Cross),
  getSmallTile(boardPosition, { x: 0, y: 2 }, TileValue.Circle),
  getSmallTile(boardPosition, { x: 1, y: 0 }, TileValue.Circle),
  getSmallTile(boardPosition, { x: 1, y: 1 }, TileValue.Empty),
  getSmallTile(boardPosition, { x: 1, y: 2 }, TileValue.Empty),
];

test('renders buttons with content', () => {
  render(
    <SmallBoard
      onTileClicked={() => {}}
      tiles={tiles}
      x={boardPosition.x}
      y={boardPosition.y}
      currentPlayer={Player.Cross}
      moveAllowed={true}
      winningPlayer={TileValue.Empty}
    />,
  );

  const buttons = screen.getAllByRole('button');
  const removeExtensions = (str: string) => str.replace(/\..*/, '');
  const buttonContent = buttons.map((b: HTMLElement) =>
    b.textContent !== null ? removeExtensions(b.textContent) : '',
  );
  expect(buttonContent).toMatchInlineSnapshot(`
    Array [
      "x",
      "x",
      "o",
      "o",
      "",
      "",
    ]
  `);
  expect(buttons).toHaveLength(6);
});

test('checks value for allowing clicking', () => {
  const onClick = jest.fn();
  render(
    <SmallBoard
      onTileClicked={onClick}
      tiles={tiles}
      x={boardPosition.x}
      y={boardPosition.y}
      currentPlayer={Player.Cross}
      moveAllowed={true}
      winningPlayer={TileValue.Empty}
    />,
  );

  const buttonsWithValue = screen.getAllByRole('button', { name: /./ });
  buttonsWithValue.forEach((button) => userEvent.click(button));
  expect(onClick).not.toHaveBeenCalled();

  const buttonsEmpty = screen.getAllByRole('button', { name: /^$/ });
  buttonsEmpty.forEach((button) => userEvent.click(button));

  expect(onClick).toHaveBeenCalledTimes(2);
});

test('doesnt allow clicking when move is not allowed', () => {
  const onClick = jest.fn();
  render(
    <SmallBoard
      onTileClicked={onClick}
      tiles={tiles}
      x={boardPosition.x}
      y={boardPosition.y}
      currentPlayer={Player.Cross}
      moveAllowed={false}
      winningPlayer={TileValue.Empty}
    />,
  );

  const buttons = screen.getAllByRole('button');
  buttons.forEach((button) => userEvent.click(button));
  expect(onClick).not.toHaveBeenCalled();
});

test('only adds one button when board is finished', () => {
  const onClick = jest.fn();
  const wonBoard = [
    getSmallTile(boardPosition, { x: 0, y: 0 }, TileValue.Cross),
    getSmallTile(boardPosition, { x: 0, y: 1 }, TileValue.Cross),
    getSmallTile(boardPosition, { x: 0, y: 2 }, TileValue.Cross),
    getSmallTile(boardPosition, { x: 1, y: 0 }, TileValue.Empty),
    getSmallTile(boardPosition, { x: 1, y: 1 }, TileValue.Empty),
    getSmallTile(boardPosition, { x: 1, y: 2 }, TileValue.Empty),
    getSmallTile(boardPosition, { x: 2, y: 0 }, TileValue.Empty),
    getSmallTile(boardPosition, { x: 2, y: 1 }, TileValue.Cross),
    getSmallTile(boardPosition, { x: 2, y: 2 }, TileValue.Circle),
  ];
  render(
    <SmallBoard
      onTileClicked={onClick}
      tiles={wonBoard}
      x={boardPosition.x}
      y={boardPosition.y}
      currentPlayer={Player.Cross}
      moveAllowed={false}
      winningPlayer={TileValue.Cross}
    />,
  );

  const buttons = screen.getAllByRole('button');
  expect(buttons).toHaveLength(1);
  userEvent.click(buttons[0]);
  expect(onClick).not.toHaveBeenCalled();
});
