import { Player } from '../../AppState';
import { Point } from '../../../lib';

export const REGISTER_MOVE = 'move/move-registered';

export const registerMove = (
  boardPosition: Point,
  tilePosition: Point,
  player: Player,
) => ({
  type: REGISTER_MOVE,
  payload: { boardPosition: boardPosition, tilePosition: tilePosition, player },
});
