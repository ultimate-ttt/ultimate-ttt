import { createSelector } from 'reselect';
import { getBoards, getMoves, getWinningPlayer } from './AppStateSelectors';

export const getWinningPlayerAsString = createSelector( [getWinningPlayer], (winningPlayer => {
    if (winningPlayer === 0) {
        return 'X';
    } else if (winningPlayer === 1) {
        return 'O';
    } else if (winningPlayer === null) {
        return null;
    } else {
        return undefined;
    }
}) );

export const getFinishedGameData = createSelector(
    [getWinningPlayerAsString, getBoards, getMoves],
    ( winningPlayer, boards, moves ) => {
        return {
            winner: winningPlayer,
            gameState: boards,
            moves,
            date: new Date()
        };
    } );