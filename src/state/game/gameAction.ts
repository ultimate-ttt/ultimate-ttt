import { Player } from '../AppState';
import { Point } from '../../util/Point';

export const CHANGE_PLAYER = 'game-reducer/player-changed';
export const PLAYER_MOVED = 'game/player-moved';
export const PLAYER_MOVED_VALID = 'game/player-moved-valid';
export const GAME_FINISHED = 'game/game-finished';
export const CHECK_GAME_FINISHED = 'game/check-game-finished';

export const changePlayer = () => ({
    type: CHANGE_PLAYER,
    payload: {}
});

export const gameFinished = ( winningPlayer?: Player ) => ({
    type: GAME_FINISHED,
    payload: winningPlayer
});

export const checkGameFinished = (  ) => ({
    type: CHECK_GAME_FINISHED
});

export const playerMoved = ( boardPoint: Point, tilePoint: Point ): PlayerMovedAction => ({
    type: PLAYER_MOVED,
    payload: {
        boardPoint,
        tilePoint
    }
});

export interface PlayerMovedAction {
    type: string;
    payload: {
        boardPoint: Point
        tilePoint: Point
    };
}