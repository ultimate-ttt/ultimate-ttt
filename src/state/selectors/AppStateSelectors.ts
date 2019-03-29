import { AppState } from '../AppState';

export const getBoards = ( state: AppState ) => state.currentGame.board;

export const getCurrentPlayer = ( state: AppState ) => state.currentGame.game.currentPlayer;

export const getWinningPlayer = ( state: AppState ) => state.currentGame.game.winningPlayer;

export const getMoves = ( state: AppState ) => state.currentGame.moves;

// TODO?
export const getFinishedGame = (state: AppState, id: string) => state.finishedGames.find(g => g.id === id);
