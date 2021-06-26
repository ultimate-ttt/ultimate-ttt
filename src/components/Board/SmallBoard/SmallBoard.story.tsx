import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Player, TileValue } from '../../../state/AppState';
import { SmallBoard, SmallBoardProps } from './SmallBoard';
import { Point } from '../../../lib';
import { action } from '@storybook/addon-actions';

function getSmallTile(boardPosition: Point, position: Point, value: TileValue) {
  return {
    boardPosition,
    position,
    value,
  };
}

function getSmallBoard(boardPosition: Point, board: TileValue[]) {
  return [
    getSmallTile(boardPosition, { x: 0, y: 0 }, board[0]),
    getSmallTile(boardPosition, { x: 0, y: 1 }, board[1]),
    getSmallTile(boardPosition, { x: 0, y: 2 }, board[2]),
    getSmallTile(boardPosition, { x: 1, y: 0 }, board[3]),
    getSmallTile(boardPosition, { x: 1, y: 1 }, board[4]),
    getSmallTile(boardPosition, { x: 1, y: 2 }, board[5]),
    getSmallTile(boardPosition, { x: 2, y: 0 }, board[6]),
    getSmallTile(boardPosition, { x: 2, y: 1 }, board[7]),
    getSmallTile(boardPosition, { x: 2, y: 2 }, board[8]),
  ];
}

export default {
  title: 'SmallBoard',
  component: SmallBoard,
  args: {
    onTileClicked: action('onTileClicked'),
    animate: true,
  },
} as Meta;

const Template: Story<SmallBoardProps> = (args) => <SmallBoard {...args} />;

export const Empty = Template.bind({});
const emptyPosition = { x: 0, y: 0 };
const boardEmpty = getSmallBoard(emptyPosition, [
  TileValue.Empty,
  TileValue.Empty,
  TileValue.Empty,
  TileValue.Empty,
  TileValue.Empty,
  TileValue.Empty,
  TileValue.Empty,
  TileValue.Empty,
  TileValue.Empty,
]);
Empty.args = {
  winningPlayer: TileValue.Empty,
  tiles: boardEmpty,
  currentPlayer: Player.Circle,
  moveAllowed: true,
  x: emptyPosition.x,
  y: emptyPosition.y,
};

export const WithValues = Template.bind({});
const withValuesPosition = { x: 1, y: 1 };
const boardWithValues = getSmallBoard(withValuesPosition, [
  TileValue.Empty,
  TileValue.Cross,
  TileValue.Empty,
  TileValue.Empty,
  TileValue.Circle,
  TileValue.Empty,
  TileValue.Cross,
  TileValue.Empty,
  TileValue.Circle,
]);
WithValues.args = {
  winningPlayer: TileValue.Empty,
  tiles: boardWithValues,
  currentPlayer: Player.Circle,
  moveAllowed: true,
  x: withValuesPosition.x,
  y: withValuesPosition.y,
};

export const WinnerCross = Template.bind({});
const winnerCrossPosition = { x: 2, y: 2 };
const boardWinnerCross = getSmallBoard(winnerCrossPosition, [
  TileValue.Cross,
  TileValue.Cross,
  TileValue.Cross,
  TileValue.Empty,
  TileValue.Empty,
  TileValue.Empty,
  TileValue.Empty,
  TileValue.Cross,
  TileValue.Circle,
]);
WinnerCross.args = {
  winningPlayer: TileValue.Cross,
  tiles: boardWinnerCross,
  currentPlayer: Player.Cross,
  moveAllowed: false,
  x: winnerCrossPosition.x,
  y: winnerCrossPosition.y,
};

export const WinnerCircle = Template.bind({});
const winnerCirclePosition = { x: 2, y: 2 };
const boardWinnerCircle = getSmallBoard(winnerCirclePosition, [
  TileValue.Cross,
  TileValue.Empty,
  TileValue.Empty,
  TileValue.Circle,
  TileValue.Circle,
  TileValue.Circle,
  TileValue.Empty,
  TileValue.Cross,
  TileValue.Circle,
]);
WinnerCircle.args = {
  winningPlayer: TileValue.Circle,
  tiles: boardWinnerCircle,
  currentPlayer: Player.Cross,
  moveAllowed: false,
  x: winnerCirclePosition.x,
  y: winnerCirclePosition.y,
};

export const NoWinner = Template.bind({});
const noWinnerPosition = { x: 2, y: 2 };
const boardNoWinner = getSmallBoard(noWinnerPosition, [
  TileValue.Cross,
  TileValue.Circle,
  TileValue.Cross,
  TileValue.Circle,
  TileValue.Cross,
  TileValue.Circle,
  TileValue.Circle,
  TileValue.Cross,
  TileValue.Circle,
]);
NoWinner.args = {
  winningPlayer: TileValue.Destroyed,
  tiles: boardNoWinner,
  currentPlayer: Player.Cross,
  moveAllowed: false,
  x: noWinnerPosition.x,
  y: noWinnerPosition.y,
};

export const Highlight = Template.bind({});
const highlightPosition = { x: 0, y: 0 };
const boardSpeciallyMarkedTile = getSmallBoard(highlightPosition, [
  TileValue.Empty,
  TileValue.Cross,
  TileValue.Empty,
  TileValue.Empty,
  TileValue.Circle,
  TileValue.Empty,
  TileValue.Cross,
  TileValue.Empty,
  TileValue.Circle,
]);
Highlight.args = {
  winningPlayer: TileValue.Empty,
  tiles: boardSpeciallyMarkedTile,
  currentPlayer: Player.Circle,
  moveAllowed: true,
  animate: true,
  x: highlightPosition.x,
  y: highlightPosition.y,
  highlight: {
    condition: true,
    position: {
      boardPosition: highlightPosition,
      tilePosition: {
        x: 0,
        y: 1,
      },
    },
  },
};
