import * as React from 'react';
import { renderWithState, screen } from '../../test-utils';
import AnalysisOverview from './AnalysisOverview';
import {
  crossFinishedBoardMock,
  movesForCrossFinishedBoardMock,
} from '../../mocks';
import { FinishedGameState, WinnerString } from '../../state/AppState';

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getGame = (
  gameState: any,
  moves: any,
  winner: WinnerString,
): FinishedGameState => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - 10);
  date.setMilliseconds(getRandomInt(0, 1000)); // avoid duplicate key
  return {
    id: undefined,
    date: date.toISOString(),
    gameState: gameState,
    moves: moves,
    saveState: '',
    winner: winner,
    errorMessage: '',
  };
};

test('renders game', () => {
  renderWithState(<AnalysisOverview />, {
    finishedGames: [
      getGame(crossFinishedBoardMock, movesForCrossFinishedBoardMock, 'X'),
    ],
  });

  const pageTitle = screen.getByRole('heading', {
    name: /recently played games/i,
  });
  const cardTitle = screen.getByRole('heading', { name: /game no. 1/i });
  const link = screen.getByRole('link', { name: /analyse game/i });
  const winner = screen.getByText(/won after \d+ moves/i);
  const ago = screen.getByText(/10 minutes ago/i);
  const gameItems = screen.getAllByText(/^x/i);

  expect(pageTitle).toBeInTheDocument();
  expect(cardTitle).toBeInTheDocument();
  expect(link).toBeInTheDocument();
  expect(ago).toBeInTheDocument();
  expect(winner).toBeInTheDocument();
  expect(gameItems[0]).toBeInTheDocument();
  const subTitle = screen.queryByRole('heading', {
    name: /no recently played games were found/i,
  });
  expect(subTitle).not.toBeInTheDocument();
});

test('renders multiple games', () => {
  renderWithState(<AnalysisOverview />, {
    finishedGames: [
      getGame(crossFinishedBoardMock, movesForCrossFinishedBoardMock, 'X'),
      getGame(crossFinishedBoardMock, movesForCrossFinishedBoardMock, 'X'),
    ],
  });

  const cardTitles = screen.getAllByRole('heading', { name: /game no. \d/i });
  expect(cardTitles).toHaveLength(2);
});

test('renders subtitle when no games exist', () => {
  renderWithState(<AnalysisOverview />);

  const pageTitle = screen.getByRole('heading', {
    name: /no recently played games were found/i,
  });
  const cardTitle = screen.queryByRole('heading', { name: /game no. \d/i });
  expect(pageTitle).toBeInTheDocument();
  expect(cardTitle).not.toBeInTheDocument();
});
