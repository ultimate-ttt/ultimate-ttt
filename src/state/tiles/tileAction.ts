import { Player } from '../AppState';
import { Point } from '../../util/Point';

export const ADD_SYMBOL = 'tile-reducer/tile-changed';

export const addSymbol = ( bigBoardPoint: Point, smallBoardPoint: Point, player: Player ) => ({
    type: ADD_SYMBOL,
    payload: { bigBoardPoint, smallBoardPoint, player }
});