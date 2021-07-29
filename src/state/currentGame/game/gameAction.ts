import { Winner } from '../../AppState';
import { Point } from '../../../lib';

export const CHANGE_PLAYER = 'game/player-changed';
export const PLAYER_MOVED = 'game/player-moved';
export const GAME_FINISHED = 'game/game-finished';
export const CHECK_GAME_FINISHED = 'game/check-game-finished';

export const changePlayer = () => ({
  type: CHANGE_PLAYER,
});

export const gameFinished = (winningPlayer: Winner) => ({
  type: GAME_FINISHED,
  payload: winningPlayer,
});

export const checkGameFinished = () => ({
  type: CHECK_GAME_FINISHED,
});

export const playerMoved = (board: Point, tile: Point): PlayerMovedAction => ({
  type: PLAYER_MOVED,
  payload: {
    board: board,
    tile: tile,
  },
});

export interface PlayerMovedAction {
  type: string;
  payload: {
    board: Point;
    tile: Point;
  };
}
