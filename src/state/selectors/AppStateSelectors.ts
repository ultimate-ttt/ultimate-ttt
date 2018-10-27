import { AppState } from '../AppState';

export const getBoards = ( state: AppState ) => state.board;

export const getCurrentPlayer = ( state: AppState ) => state.game.currentPlayer;

export const getWinningPlayer = ( state: AppState ) => state.game.winningPlayer;

export const getIsReplay = ( state: AppState ) => state.game.isReplay;

export const getMoves = ( state: AppState ) => state.moves;