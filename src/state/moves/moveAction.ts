import { Player } from '../AppState';
import { Point } from '../../util/Point';

export const REGISTER_MOVE = 'move-reducer/move-registered';

export const registerMove = ( boardPosition: Point, tilePosition: Point, player: Player ) => ({
    type: REGISTER_MOVE,
    payload: { boardPosition: boardPosition, tilePosition: tilePosition, player }
});
