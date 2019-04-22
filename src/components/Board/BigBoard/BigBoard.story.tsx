import * as React from 'react';
import { object, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { BigBoard } from './BigBoard';
import { Player } from '../../../state/AppState';
import {
  circleFinishedBoardMock,
  crossFinishedBoardMock,
  unfinishedBoardMock,
} from '../../../__mocks__';
import { action } from '@storybook/addon-actions';
import './BigBoard.module.css';

const stories = storiesOf('BigBoard', module);
stories.addDecorator(withKnobs);

const boardValues = { Circle: Player.Circle, Cross: Player.Cross };

stories.add('BigBoard, not finished', () => (
  <BigBoard
    currentPlayer={select('currentPlayer', boardValues, Player.Circle)}
    board={unfinishedBoardMock}
    activeBoards={object('activeBoards', [{ x: 0, y: 2 }])}
    onPlayerMoved={action('onPlayerMoved')}
  />
));

stories.add('BigBoard, finished circle', () => (
  <BigBoard
    currentPlayer={select('currentPlayer', boardValues, Player.Cross)}
    board={circleFinishedBoardMock}
    activeBoards={[]}
    onPlayerMoved={action('onPlayerMoved')}
  />
));

stories.add('BigBoard, finished cross', () => (
  <BigBoard
    currentPlayer={select('currentPlayer', boardValues, Player.Circle)}
    board={crossFinishedBoardMock}
    activeBoards={[]}
    onPlayerMoved={action('onPlayerMoved')}
  />
));

stories.add('BigBoard, markTileSpecially', () => (
  <BigBoard
    currentPlayer={select('currentPlayer', boardValues, Player.Cross)}
    board={circleFinishedBoardMock}
    activeBoards={[]}
    onPlayerMoved={action('onPlayerMoved')}
    markTileSpecially={object('markTileSpecially', {
      condition: true,
      position: {
        boardPosition: { x: 2, y: 2 },
        tilePosition: { x: 0, y: 1 },
      },
    })}
  />
));
