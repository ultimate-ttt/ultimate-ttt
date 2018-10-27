import { createSelector } from 'reselect';
import { getBoards, getIsReplay, getMoves, getWinningPlayer } from './AppStateSelectors';

export const getWinningPlayerAsString = createSelector( [getWinningPlayer], (winningPlayer => {
    if (winningPlayer === 0) {
        return 'X';
    } else if (winningPlayer === 1) {
        return 'Y';
    } else if (winningPlayer === null) {
        return null;
    } else {
        return undefined;
    }
}) );

export const getFinishedGameData = createSelector(
    [getWinningPlayerAsString, getIsReplay, getBoards, getMoves],
    ( winningPlayer, isReplay, boards, moves ) => {
        return {
            winner: winningPlayer,
            gameState: boards,
            isReplay,
            moves
        };
    } );