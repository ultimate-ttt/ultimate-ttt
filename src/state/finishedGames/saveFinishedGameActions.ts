import { FinishedGameState, StringAction, TypeOnlyAction } from "../AppState";

export const SAVE_GAME = 'finishedGames/save-game';
export const SAVE_GAME_PENDING = 'finishedGames/save-game-pending';
export const SAVE_GAME_FULFILLED = 'finishedGames/save-game-data-fulfilled';
export const SAVE_GAME_REJECTED = 'finishedGames/save-game-rejected';

export const saveGame = (finishedGame: FinishedGameState): SaveGameAction => ({
  type: SAVE_GAME,
  payload: finishedGame,
  saveOnline: true,
});

export const saveGamePending = (): SaveGamePendingAction => ({
  type: SAVE_GAME_PENDING,
});

export const saveGameFulfilled = (gameId: string): SaveGameFulfilledAction => ({
  type: SAVE_GAME_FULFILLED,
  payload: gameId,
});

export const saveGameRejected = (
  errorMessage: string,
): SaveGameRejectedAction => ({
  type: SAVE_GAME_REJECTED,
  payload: errorMessage,
});

export interface SaveGameAction {
  type: string;
  payload: FinishedGameState;
  saveOnline: boolean;
}
export interface SaveGamePendingAction extends TypeOnlyAction {}
export interface SaveGameFulfilledAction extends StringAction {}
export interface SaveGameRejectedAction extends StringAction {}
