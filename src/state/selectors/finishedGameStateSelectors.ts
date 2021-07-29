import { createSelector } from 'reselect';
import { getBoards, getMoves, getWinningPlayer } from './appStateSelectors';
import { AppState, Winner } from '../AppState';

export const getFinishedGames = (state: AppState) => state.finishedGames;

const getWinningPlayerAsString = createSelector(
  [getWinningPlayer],
  (winningPlayer: Winner) => {
    switch (winningPlayer) {
      case Winner.Circle:
        return 'O';
      case Winner.Cross:
        return 'X';
      case Winner.Draw:
        return null;
      default:
        return undefined;
    }
  },
);

export const getFinishedGame = createSelector(
  [getWinningPlayerAsString, getBoards, getMoves],
  (winningPlayer, boards, moves) => {
    return {
      winner: winningPlayer,
      gameState: boards,
      moves: moves,
      date: new Date().toISOString(),
    };
  },
);
