import { storiesOf } from '@storybook/react';
import { date, number, select, text, withKnobs } from '@storybook/addon-knobs';
import * as React from 'react';
import { GameSummaryCard } from './GameSummaryCard';
import {
  circleFinishedBoardMock,
  crossFinishedBoardMock,
  drawFinishedBoardMock,
  movesForCircleFinishedBoardMock,
  movesForCrossFinishedBoardMock,
  movesForDrawFinishedBoardMock,
} from '../../../__mocks__';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { WinnerString } from '../../../state/AppState';
import { IconProvider } from '../../IconProvider';

const stories = storiesOf('Analysis', module);
stories.addDecorator(withKnobs);

const gameStateOptions = {
  cross: {
    state: crossFinishedBoardMock,
    moves: movesForCrossFinishedBoardMock,
    winner: 'X',
  },
  circle: {
    state: circleFinishedBoardMock,
    moves: movesForCircleFinishedBoardMock,
    winner: 'O',
  },
  draw: {
    state: drawFinishedBoardMock,
    moves: movesForDrawFinishedBoardMock,
    winner: null,
  },
};

function isoStringDateKnob(name: string, defaultValue: Date) {
  const stringTimestamp = date(name, defaultValue);
  return new Date(stringTimestamp).toISOString();
}

stories.add('GameSummaryCard', () => {
  const selectedGameState = select(
    'gameState',
    gameStateOptions,
    gameStateOptions.cross,
  );

  const defaultDate = new Date(2019, 1, 1);

  return (
    <IconProvider>
      <Router>
        <div style={{ height: '100%' }}>
          <GameSummaryCard
            gameNumber={number('gameNumber', 1)}
            game={{
              id: '1',
              gameState: selectedGameState.state,
              date: isoStringDateKnob('date', defaultDate),
              winner: selectedGameState.winner as WinnerString,
              moves: selectedGameState.moves,
              saveState: 'fulfilled',
              errorMessage: '',
            }}
            link={{ tag: Link, to: text('to', '/test') }}
          />
        </div>
      </Router>
    </IconProvider>
  );
});
