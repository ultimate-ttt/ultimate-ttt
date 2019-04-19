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

export const getDate = createSelector(
  [],
  () => new Date(),
);

export const getFinishedGameData = createSelector(
  [getWinningPlayerAsString, getBoards, getMoves, getDate],
  (winningPlayer, boards, moves, date) => {
    return {
      winner: winningPlayer,
      gameState: boards,
      moves: moves,
      date: date,
    };
  },
);
