import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { GameSummaryCard, GameSummaryCardProps } from './GameSummaryCard';
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

export default {
  title: 'GameSummaryCard',
  component: GameSummaryCard,
} as Meta;

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

const defaultDate = new Date(2019, 1, 1).toISOString();

export const CrossWins: Story<GameSummaryCardProps> = (args) => (
  <IconProvider>
    <Router>
      <div style={{ height: '100%' }}>
        <GameSummaryCard
          {...args}
          game={{
            id: '1',
            gameState: gameStateOptions.cross.state,
            date: defaultDate,
            winner: gameStateOptions.cross.winner as WinnerString,
            moves: gameStateOptions.cross.moves,
            saveState: 'fulfilled',
            errorMessage: '',
          }}
        />
      </div>
    </Router>
  </IconProvider>
);
CrossWins.args = {
  gameNumber: 1,
  link: { tag: Link, to: '/test' },
};

export const CircleWins: Story<GameSummaryCardProps> = (args) => (
  <IconProvider>
    <Router>
      <div style={{ height: '100%' }}>
        <GameSummaryCard
          {...args}
          game={{
            id: '1',
            gameState: gameStateOptions.circle.state,
            date: defaultDate,
            winner: gameStateOptions.circle.winner as WinnerString,
            moves: gameStateOptions.circle.moves,
            saveState: 'fulfilled',
            errorMessage: '',
          }}
        />
      </div>
    </Router>
  </IconProvider>
);
CircleWins.args = {
  gameNumber: 1,
  link: { tag: Link, to: '/test' },
};

export const Draw: Story<GameSummaryCardProps> = (args) => (
  <IconProvider>
    <Router>
      <div style={{ height: '100%' }}>
        <GameSummaryCard
          {...args}
          game={{
            id: '1',
            gameState: gameStateOptions.draw.state,
            date: defaultDate,
            winner: gameStateOptions.draw.winner as WinnerString,
            moves: gameStateOptions.draw.moves,
            saveState: 'fulfilled',
            errorMessage: '',
          }}
        />
      </div>
    </Router>
  </IconProvider>
);
Draw.args = {
  gameNumber: 1,
  link: { tag: Link, to: '/test' },
};
