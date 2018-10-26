import { Move, SmallBoardInformation } from '../AppState';

export const SAVE_GAME_DATA = 'save-game-data/save-game-data-pending';
export const SAVE_GAME_DATA_TO_SERVER_PENDING = 'save-game-data/save-game-data-pending';
export const SAVE_GAME_DATA_TO_SERVER_FULFILLED = 'save-game-data/save-game-data-fulfilled';
export const SAVE_GAME_DATA_TO_SERVER_REJECTED = 'save-game-data/save-game-data-rejected';


type GameData = {
    winner: string,
    gameState: SmallBoardInformation[],
    moves: Move[],
    isReplay: boolean
}

export const saveGameData = ( gameData: GameData ): SaveGameDataAction => ({
    type: SAVE_GAME_DATA,
    gameData
});

export interface SaveGameDataAction {
    type: string;
    gameData: GameData;
}