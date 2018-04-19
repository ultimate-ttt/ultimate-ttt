import { Player } from '../AppState';
import { Point } from '../../util/Point';

export const CHANGE_PLAYER = 'game-reducer/player-changed';
export const PLAYER_MOVED = 'game/player-moved';
export const PLAYER_MOVED_VALID = 'game/player-moved-valid';
export const GAME_FINISHED = 'game/game-finished';
export const CHECK_GAME_FINISHED = 'game/check-game-finished';
export const RESTART_GAME = 'restart-game';

export const changePlayer = () => ({
    type: CHANGE_PLAYER
});

export const restartGame = () => ({
    type: RESTART_GAME
});

export const gameFinished = ( winningPlayer?: Player | null ) => ({
    type: GAME_FINISHED,
    payload: winningPlayer
});

export const checkGameFinished = (  ) => ({
    type: CHECK_GAME_FINISHED
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
