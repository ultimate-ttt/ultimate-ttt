import { object, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { BigBoard } from './BigBoard';
import { Player } from '../../../state/AppState';
import unfinishedBoardMock from '../../../__mocks__/unfinishedBoardMock';
import {
  circleFinishedBoardMock,
  crossFinishedBoardMock,
} from '../../../__mocks__/finishedBoardMock';

const stories = storiesOf('BigBoard', module);
stories.addDecorator(withKnobs);

const boardValues = { Circle: Player.Circle, Cross: Player.Cross };

stories.add('BigBoard, not finished', () => {
  const onPlayerMoved = (
    boardX: number,
    boardY: number,
    tileX: number,
    tileY: number,
  ) => {
    // tslint:disable-next-line: no-console
    console.log(
      `clicked board: ${boardX}/${boardY}. clicked tile: ${tileX}/${tileY}`,
    );
  };

  return (
    <BigBoard
      currentPlayer={select('currentPlayer', boardValues, Player.Circle)}
      board={unfinishedBoardMock}
      activeBoards={object('activeBoards', [{ x: 0, y: 2 }])}
      onPlayerMoved={onPlayerMoved}
    />
  );
});

stories.add('BigBoard, finished circle', () => {
  const onPlayerMoved = (
    boardX: number,
    boardY: number,
    tileX: number,
    tileY: number,
  ) => {
    // tslint:disable-next-line: no-console
    console.log(
      `clicked board: ${boardX}/${boardY}. clicked tile: ${tileX}/${tileY}`,
    );
  };

  return (
    <BigBoard
      currentPlayer={select('currentPlayer', boardValues, Player.Cross)}
      board={circleFinishedBoardMock}
      activeBoards={[]}
      onPlayerMoved={onPlayerMoved}
    />
  );
});

stories.add('BigBoard, finished cross', () => {
  const onPlayerMoved = (
    boardX: number,
    boardY: number,
    tileX: number,
    tileY: number,
  ) => {
    // tslint:disable-next-line: no-console
    console.log(
      `clicked board: ${boardX}/${boardY}. clicked tile: ${tileX}/${tileY}`,
    );
  };

  return (
    <BigBoard
      currentPlayer={select('currentPlayer', boardValues, Player.Circle)}
      board={crossFinishedBoardMock}
      activeBoards={[]}
      onPlayerMoved={onPlayerMoved}
    />
  );
});

stories.add('BigBoard, markTileSpecially', () => {
  const onPlayerMoved = (
    boardX: number,
    boardY: number,
    tileX: number,
    tileY: number,
  ) => {
    // tslint:disable-next-line: no-console
    console.log(
      `clicked board: ${boardX}/${boardY}. clicked tile: ${tileX}/${tileY}`,
    );
  };

  return (
    <BigBoard
      currentPlayer={select('currentPlayer', boardValues, Player.Cross)}
      board={circleFinishedBoardMock}
      activeBoards={[]}
      onPlayerMoved={onPlayerMoved}
      markTileSpecially={object('markTileSpecially', {
        condition: true,
        position: {
          boardPosition: { x: 2, y: 2 },
          tilePosition: { x: 0, y: 0 },
        },
      })}
    />
  );
});
