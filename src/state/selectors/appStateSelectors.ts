import { AppState } from '../AppState';

export const getBoards = (state: AppState) => state.currentGame.board;

export const getActiveBoards = (state: AppState) =>
  state.currentGame.activeBoards;

export const getCurrentPlayer = (state: AppState) =>
  state.currentGame.game.currentPlayer;

export const getWinningPlayer = (state: AppState) =>
  state.currentGame.game.winningPlayer;

export const getMoves = (state: AppState) => state.currentGame.moves;
