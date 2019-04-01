import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Player, TileValue } from '../../../state/AppState';
import { SmallBoard } from './SmallBoard';
import { Point } from '../../../util/Point';

const stories = storiesOf('SmallBoard', module);
stories.addDecorator(withKnobs);

const boardValues = { Circle: Player.Circle, Cross: Player.Cross };

function getSmallTile(boardPosition: Point, position: Point, value: TileValue) {
  return {
    boardPosition,
    position,
    value,
  };
}

stories.add('SmallBoard Empty', () => {
  const clicked = (x: number, y: number) => {
    // tslint:disable-next-line: no-console
    console.log('clicked:' + x + y);
  };
  const boardPosition = { x: 0, y: 0 };
  const smallTileInformation = [
    getSmallTile(boardPosition, { x: 0, y: 0 }, TileValue.Empty),
    getSmallTile(boardPosition, { x: 0, y: 1 }, TileValue.Empty),
    getSmallTile(boardPosition, { x: 0, y: 2 }, TileValue.Empty),
    getSmallTile(boardPosition, { x: 1, y: 0 }, TileValue.Empty),
    getSmallTile(boardPosition, { x: 1, y: 1 }, TileValue.Empty),
    getSmallTile(boardPosition, { x: 1, y: 2 }, TileValue.Empty),
    getSmallTile(boardPosition, { x: 2, y: 0 }, TileValue.Empty),
    getSmallTile(boardPosition, { x: 2, y: 1 }, TileValue.Empty),
    getSmallTile(boardPosition, { x: 2, y: 2 }, TileValue.Empty),
  ];

  return (
    <SmallBoard
      onTileClicked={clicked}
      winningPlayer={TileValue.Empty}
      tiles={smallTileInformation}
      currentPlayer={select('currentPlayer', boardValues, Player.Circle)}
      isMoveAllowed={boolean('isMoveAllowed', true)}
      x={0}
      y={0}
    />
  );
});

stories.add('SmallBoard With Values', () => {
  const clicked = (x: number, y: number) => {
    // tslint:disable-next-line: no-console
    console.log('clicked: ' + x + y);
  };

  const boardPosition = { x: 1, y: 1 };
  const smallTileInformation = [
    getSmallTile(boardPosition, { x: 0, y: 0 }, TileValue.Empty),
    getSmallTile(boardPosition, { x: 0, y: 1 }, TileValue.Cross),
    getSmallTile(boardPosition, { x: 0, y: 2 }, TileValue.Empty),
    getSmallTile(boardPosition, { x: 1, y: 0 }, TileValue.Empty),
    getSmallTile(boardPosition, { x: 1, y: 1 }, TileValue.Circle),
    getSmallTile(boardPosition, { x: 1, y: 2 }, TileValue.Empty),
    getSmallTile(boardPosition, { x: 2, y: 0 }, TileValue.Cross),
    getSmallTile(boardPosition, { x: 2, y: 1 }, TileValue.Empty),
    getSmallTile(boardPosition, { x: 2, y: 2 }, TileValue.Circle),
  ];

  return (
    <SmallBoard
      onTileClicked={clicked}
      winningPlayer={TileValue.Empty}
      tiles={smallTileInformation}
      currentPlayer={select('currentPlayer', boardValues, Player.Circle)}
      isMoveAllowed={boolean('isMoveAllowed', true)}
      x={0}
      y={0}
    />
  );
});

stories.add('Smallboard won cross', () => {
  const clicked = (x: number, y: number) => {
    // tslint:disable-next-line: no-console
    console.log('clicked:' + x + y);
  };

  const boardPosition = { x: 2, y: 2 };
  const smallTileInformation = [
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

  return (
    <SmallBoard
      onTileClicked={clicked}
      winningPlayer={TileValue.Cross}
      tiles={smallTileInformation}
      currentPlayer={Player.Cross}
      isMoveAllowed={false}
      x={2}
      y={2}
    />
  );
});

stories.add('Smallboard won circle', () => {
  const clicked = (x: number, y: number) => {
    // tslint:disable-next-line: no-console
    console.log('clicked:' + x + y);
  };

  const boardPosition = { x: 2, y: 2 };
  const smallTileInformation = [
    getSmallTile(boardPosition, { x: 0, y: 0 }, TileValue.Cross),
    getSmallTile(boardPosition, { x: 0, y: 1 }, TileValue.Empty),
    getSmallTile(boardPosition, { x: 0, y: 2 }, TileValue.Empty),
    getSmallTile(boardPosition, { x: 1, y: 0 }, TileValue.Circle),
    getSmallTile(boardPosition, { x: 1, y: 1 }, TileValue.Circle),
    getSmallTile(boardPosition, { x: 1, y: 2 }, TileValue.Circle),
    getSmallTile(boardPosition, { x: 2, y: 0 }, TileValue.Empty),
    getSmallTile(boardPosition, { x: 2, y: 1 }, TileValue.Cross),
    getSmallTile(boardPosition, { x: 2, y: 2 }, TileValue.Circle),
  ];

  return (
    <SmallBoard
      onTileClicked={clicked}
      winningPlayer={TileValue.Circle}
      tiles={smallTileInformation}
      currentPlayer={Player.Cross}
      isMoveAllowed={false}
      x={2}
      y={2}
    />
  );
});

stories.add('Smallboard won no winner', () => {
  const clicked = (x: number, y: number) => {
    // tslint:disable-next-line: no-console
    console.log('clicked:' + x + y);
  };

  const boardPosition = { x: 2, y: 2 };
  const smallTileInformation = [
    getSmallTile(boardPosition, { x: 0, y: 0 }, TileValue.Cross),
    getSmallTile(boardPosition, { x: 0, y: 1 }, TileValue.Circle),
    getSmallTile(boardPosition, { x: 0, y: 2 }, TileValue.Cross),
    getSmallTile(boardPosition, { x: 1, y: 0 }, TileValue.Circle),
    getSmallTile(boardPosition, { x: 1, y: 1 }, TileValue.Cross),
    getSmallTile(boardPosition, { x: 1, y: 2 }, TileValue.Circle),
    getSmallTile(boardPosition, { x: 2, y: 0 }, TileValue.Circle),
    getSmallTile(boardPosition, { x: 2, y: 1 }, TileValue.Cross),
    getSmallTile(boardPosition, { x: 2, y: 2 }, TileValue.Circle),
  ];

  return (
    <SmallBoard
      onTileClicked={clicked}
      winningPlayer={TileValue.Destroyed}
      tiles={smallTileInformation}
      currentPlayer={Player.Cross}
      isMoveAllowed={false}
      x={2}
      y={2}
    />
  );
});
