import { Player } from '../AppState';
import { Point } from '../../util/Point';

export const CHANGE_PLAYER = 'game/player-changed';
export const PLAYER_MOVED = 'game/player-moved';
export const PLAYER_MOVED_VALID = 'game/player-moved-valid';
export const GAME_FINISHED = 'game/game-finished';
export const CHECK_GAME_FINISHED = 'game/check-game-finished';
export const SAVE_FINISHED_GAME_DATA = 'game/save-finished-game-data';

export const changePlayer = () => ({
    type: CHANGE_PLAYER
});

export const gameFinished = ( winningPlayer?: Player | null ) => ({
    type: GAME_FINISHED,
    payload: winningPlayer
});

export const checkGameFinished = (  ) => ({
    type: CHECK_GAME_FINISHED
});

export const saveFinishedGameData = () => ({
    type: SAVE_FINISHED_GAME_DATA
});

export const playerMoved = ( boardPosition: Point, tilePosition: Point ): PlayerMovedAction => ({
    type: PLAYER_MOVED,
    payload: {
        boardPosition: boardPosition,
        tilePosition: tilePosition
    }
});

export interface PlayerMovedAction {
    type: string;
    payload: {
        boardPosition: Point
        tilePosition: Point
    };
}
