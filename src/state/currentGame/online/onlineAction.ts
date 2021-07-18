import {
  GenericAction,
  Player,
  StringAction,
  TypeOnlyAction,
} from '../../AppState';

export const CREATE_GAME = 'online/create-game';
export const JOIN_GAME = 'online/join-game';
export const CONNECT_GAME_PENDING = 'online/connect-game-pending';
export const CONNECT_GAME_FULFILLED = 'online/connect-game-fulfilled';
export const CONNECT_GAME_REJECTED = 'online/connect-game-rejected';

export const PLAYER_MOVED_PENDING = 'online/player-moved-pending';
export const PLAYER_MOVED_FULFILLED = 'online/player-moved-fulfilled';
export const PLAYER_MOVED_REJECTED = 'online/player-moved-rejected';

export const createGame = (): CreateGameAction => ({
  type: CREATE_GAME,
});

export const joinGame = (id: string): JoinGameAction => ({
  type: JOIN_GAME,
  payload: id,
});

export const connectGamePending = () => ({ type: CONNECT_GAME_PENDING });

export const connectGameFulfilled = (
  gameId: string,
  playerId: string,
  player: Player,
): ConnectGameFulfilledAction => ({
  type: CONNECT_GAME_FULFILLED,
  payload: {
    gameId,
    playerId,
    player,
  },
});

export const connectGameRejected = (errorMessage: string) => ({
  type: CONNECT_GAME_REJECTED,
  payload: errorMessage,
});

export const playerMovedPending = () => ({ type: PLAYER_MOVED_PENDING });
export const playerMovedFulfilled = () => ({ type: PLAYER_MOVED_FULFILLED });
export const playerMovedRejected = (errorMessage: string) => ({
  type: PLAYER_MOVED_REJECTED,
  payload: errorMessage,
});

export interface CreateGameAction extends TypeOnlyAction {}
export interface JoinGameAction extends StringAction {}

export interface ConnectGameFulfilledAction extends GenericAction {
  payload: {
    gameId: string;
    playerId: string;
    player: Player;
  };
}
