import { AppState } from '../AppState';
import { createSelector } from 'reselect';

export const getBoards = ( state: AppState ) => state.board;

export const getCurrentPlayer = ( state: AppState ) => state.game.currentPlayer;

export const getWinningPlayer = ( state: AppState ) => state.game.winningPlayer;

export const getIsReplay = ( state: AppState ) => state.game.isReplay;

export const getMoves = ( state: AppState ) => state.moves;

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