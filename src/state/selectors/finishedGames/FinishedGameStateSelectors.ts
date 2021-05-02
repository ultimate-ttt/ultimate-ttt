import { createSelector } from 'reselect';
import { getBoards, getMoves, getWinningPlayer } from '../AppStateSelectors';
import { Winner } from '../../AppState';

export const getWinningPlayerAsString = createSelector(
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

export const getFinishedGameData = createSelector(
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
