import { Player } from '../AppState';

export const CHANGE_PLAYER = 'game-reducer/player-changed';
export const PLAYER_MOVED = 'game/player-moved';
export const PLAYER_MOVED_VALID = 'game/player-moved-valid';
export const changePlayer = () => ({
    type: CHANGE_PLAYER,
    payload: {}
});

export const playerMoved = ( boardX: number, boardY: number, tileX: number, tileY: number ) => ({
    type: PLAYER_MOVED,
    payload: {
        boardX,
        boardY,
        tileX,
        tileY
    }
});

export const playerMovedValid = ( boardX: number, boardY: number, tileX: number, tileY: number, player: Player ) => ({
    type: PLAYER_MOVED_VALID,
    payload: {
        boardX,
        boardY,
        tileX,
        tileY,
        player
    }
});