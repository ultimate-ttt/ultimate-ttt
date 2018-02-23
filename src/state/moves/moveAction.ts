import { Player } from '../AppState';
import { Point } from '../../util/Point';

export const REGISTER_MOVE = 'move-reducer/move-registered';

export const registerMove = ( bigBoardPoint: Point, smallBoardPoint: Point, player: Player ) => ({
    type: REGISTER_MOVE,
    payload: { bigBoardPoint, smallBoardPoint, player }
});
