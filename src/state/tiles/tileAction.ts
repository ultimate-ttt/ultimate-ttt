import { TileValue } from '../AppState';
import { Point } from '../../util/Point';

export const SET_TILE_VALUE = 'tile-reducer/set-tile-value';

export const setTileValue = ( bigBoardPoint: Point, smallBoardPoint: Point, tileValue: TileValue ) => ({
    type: SET_TILE_VALUE,
    payload: {bigBoardPoint, smallBoardPoint, tileValue}
});