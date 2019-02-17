import { FinishedGameState } from '../AppState';

export const SAVE_GAME_DATA = 'save-game-data/save-game-data';
export const SAVE_GAME_DATA_PENDING = 'save-game-data/save-game-data-pending';
export const SAVE_GAME_DATA_FULFILLED = 'save-game-data/save-game-data-fulfilled';
export const SAVE_GAME_DATA_REJECTED = 'save-game-data/save-game-data-rejected';

export const saveGameData = ( finishedGame: FinishedGameState ): SaveGameDataAction => ({
    type: SAVE_GAME_DATA,
    payload: finishedGame
});

export const saveGameDataPending = ( ): SaveGameDataPendingAction => ({
    type: SAVE_GAME_DATA_PENDING
});

export const saveGameDataFulfilled = ( ): SaveGameDataFulfilledAction => ({
    type: SAVE_GAME_DATA_FULFILLED,
});

export const saveGameDataRejected = ( errorMessage: string ): SaveGameDataRejectedAction => ({
    type: SAVE_GAME_DATA_REJECTED,
    payload: errorMessage
});

export interface SaveGameDataAction {
    type: string;
    payload: FinishedGameState;
}

export interface SaveGameDataPendingAction {
    type: string;
}

export interface SaveGameDataFulfilledAction {
    type: string;
}

export interface SaveGameDataRejectedAction {
    type: string;
    payload: string;
}