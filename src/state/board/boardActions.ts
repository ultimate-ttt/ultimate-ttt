import { TileValue } from '../AppState';
import { Point } from '../../util/Point';

export const SET_TILE_VALUE = 'tile-reducer/set-tile-value';
export const SET_BOARD_VALUE = 'tile-reducer/set-board-value';
export const CALCULATE_BOARD_VALUE = 'tile-reducer/calculate-board-value';

export const setTileValue = ( bigBoardPoint: Point, smallBoardPoint: Point, tileValue: TileValue ) => ({
    type: SET_TILE_VALUE,
    payload: {bigBoardPoint, smallBoardPoint, tileValue}
});

export const setBoardValue = ( bigBoardPoint: Point, tileValue: TileValue ) => ({
    type: SET_BOARD_VALUE,
    payload: {bigBoardPoint, tileValue}
});

export const calculateBoardValue = ( bigBoardPoint: Point ) => ({
    type: CALCULATE_BOARD_VALUE,
    payload: bigBoardPoint
});