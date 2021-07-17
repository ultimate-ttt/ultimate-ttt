import { AppState } from '../AppState';

export const getBoards = (state: AppState) => state.currentGame.board;

export const getCurrentPlayer = (state: AppState) =>
  state.currentGame.game.currentPlayer;

export const getWinningPlayer = (state: AppState) =>
  state.currentGame.game.winningPlayer;

export const getMoves = (state: AppState) => state.currentGame.moves;

export const getFinishedGames = (state: AppState) => state.finishedGames;

export const getHowToPlay = (state: AppState) => state.howToPlay;

export const getOnlineGameId = (state: AppState) =>
  state.currentGame.online.gameId;

export const getOnlinePlayerId = (state: AppState) =>
  state.currentGame.online.playerId;
