import { GenericAction, StringAction, TypeOnlyAction } from '../../AppState';

export const CREATE_GAME = 'online/create-game';
export const CREATE_GAME_PENDING = 'online/create-game-pending';
export const CREATE_GAME_FULFILLED = 'online/create-game-fulfilled';
export const CREATE_GAME_REJECTED = 'online/create-game-rejected';
export const JOIN_GAME = 'online/join-game';
export const JOIN_GAME_PENDING = 'online/join-game-pending';
export const JOIN_GAME_FULFILLED = 'online/join-game-fulfilled';
export const JOIN_GAME_REJECTED = 'online/join-game-rejected';

export const createGame = (): CreateGameAction => ({
  type: CREATE_GAME,
});

export const createGamePending = (): CreateGamePendingAction => ({
  type: CREATE_GAME_PENDING,
});

export const createGameFulfilled = (
  gameId: string,
  playerId: string,
): CreateGameFulfilledAction => ({
  type: CREATE_GAME_FULFILLED,
  payload: {
    gameId,
    playerId,
  },
});

export const createGameRejected = (
  errorMessage: string,
): CreateGameRejectedAction => ({
  type: CREATE_GAME_REJECTED,
  payload: errorMessage,
});

export const joinGame = (id: string): JoinGameAction => ({
  type: JOIN_GAME,
  payload: id,
});

export const joinGamePending = (): JoinGamePendingAction => ({
  type: JOIN_GAME_PENDING,
});

export const joinGameFulfilled = (
  gameId: string,
  playerId: string,
): CreateGameFulfilledAction => ({
  type: JOIN_GAME_FULFILLED,
  payload: {
    gameId,
    playerId,
  },
});

export const joinGameRejected = (
  errorMessage: string,
): CreateGameRejectedAction => ({
  type: JOIN_GAME_REJECTED,
  payload: errorMessage,
});

export interface CreateGameAction extends TypeOnlyAction {}
export interface CreateGamePendingAction extends TypeOnlyAction {}
export interface CreateGameFulfilledAction extends GenericAction {
  payload: {
    gameId: string;
    playerId: string;
  };
}
export interface CreateGameRejectedAction extends StringAction {}

export interface JoinGameAction extends StringAction {}
export interface JoinGameAction extends TypeOnlyAction {}
export interface JoinGamePendingAction extends TypeOnlyAction {}
export interface JoinGameFulfilledAction extends GenericAction {
  payload: {
    gameId: string;
    playerId: string;
  };
}
export interface JoinGameRejectedAction extends StringAction {}
