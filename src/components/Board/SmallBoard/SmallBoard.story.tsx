import * as React from 'react';
import { boolean, number, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Player, TileValue } from '../../../state/AppState';
import { SmallBoard } from './SmallBoard';
import { Point } from '../../../util';
import { action } from '@storybook/addon-actions';
import './SmallBoard.module.css';

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
      onTileClicked={action('onTileClicked')}
      winningPlayer={TileValue.Empty}
      tiles={smallTileInformation}
      currentPlayer={select('currentPlayer', boardValues, Player.Circle)}
      moveAllowed={boolean('moveAllowed', true)}
      animate={boolean('animate', true)}
      x={0}
      y={0}
    />
  );
});

stories.add('SmallBoard With Values', () => {
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
      onTileClicked={action('onTileClicked')}
      winningPlayer={TileValue.Empty}
      tiles={smallTileInformation}
      currentPlayer={select('currentPlayer', boardValues, Player.Circle)}
      moveAllowed={boolean('moveAllowed', true)}
      animate={boolean('animate', true)}
      x={0}
      y={0}
    />
  );
});

stories.add('SmallBoard won cross', () => {
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
      onTileClicked={action('onTileClicked')}
      winningPlayer={TileValue.Cross}
      tiles={smallTileInformation}
      currentPlayer={Player.Cross}
      moveAllowed={false}
      animate={boolean('animate', true)}
      x={2}
      y={2}
    />
  );
});

stories.add('SmallBoard won circle', () => {
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
      onTileClicked={action('onTileClicked')}
      winningPlayer={TileValue.Circle}
      tiles={smallTileInformation}
      currentPlayer={Player.Cross}
      moveAllowed={false}
      animate={boolean('animate', true)}
      x={2}
      y={2}
    />
  );
});

stories.add('SmallBoard won no winner', () => {
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
      onTileClicked={action('onTileClicked')}
      winningPlayer={TileValue.Destroyed}
      tiles={smallTileInformation}
      currentPlayer={Player.Cross}
      moveAllowed={false}
      animate={boolean('animate', true)}
      x={2}
      y={2}
    />
  );
});

stories.add('SmallBoard with specially marked tile', () => {
  const boardPosition = { x: 0, y: 0 };
  const boardFinished = boolean('boardFinished', false);
  let smallTileInformation;
  let winningPlayer = TileValue.Empty;
  if (boardFinished) {
    smallTileInformation = [
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
    winningPlayer = TileValue.Circle;
  } else {
    smallTileInformation = [
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
  }

  return (
    <SmallBoard
      onTileClicked={action('onTileClicked')}
      winningPlayer={winningPlayer}
      tiles={smallTileInformation}
      currentPlayer={select('currentPlayer', boardValues, Player.Circle)}
      moveAllowed={boolean('moveAllowed', true)}
      animate={boolean('animate', true)}
      x={0}
      y={0}
      markTileSpecially={{
        condition: true,
        position: {
          boardPosition: { x: 0, y: 0 },
          tilePosition: {
            x: number('tilePositionX', 0),
            y: number('tilePositionY', 0),
          },
        },
      }}
    />
  );
});
