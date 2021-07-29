import { AppState } from '../AppState';

export const getOnlineGameId = (state: AppState) =>
  state.currentGame.online.gameId;

export const getOnlinePlayerId = (state: AppState) =>
  state.currentGame.online.playerId;

export const getOnlinePlayer = (state: AppState) =>
  state.currentGame.online.player;

export const getIsOnlineGame = (state: AppState) =>
  state.currentGame.online.gameId !== undefined &&
  state.currentGame.online.playerId !== undefined;

export const getShouldJoinGame = (state: AppState) =>
  !getIsOnlineGame(state) &&
  state.currentGame.online.connectGame.saveState === '';
