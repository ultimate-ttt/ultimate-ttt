import { TileValue } from '../AppState';
import { Point } from '../../util/Point';

export const SET_TILE_VALUE = 'tile-reducer/set-tile-value';
export const SET_BOARD_VALUE = 'tile-reducer/set-board-value';
export const CALCULATE_BOARD_VALUE = 'tile-reducer/calculate-board-value';

export const setTileValue = ( boardPosition: Point, tilePosition: Point, tileValue: TileValue ) => ({
    type: SET_TILE_VALUE,
    payload: {boardPosition: boardPosition, tilePosition: tilePosition, tileValue: tileValue}
});

export const setBoardValue = ( boardPosition: Point, tileValue: TileValue ) => ({
    type: SET_BOARD_VALUE,
    payload: {boardPosition: boardPosition, tileValue}
});

export const calculateBoardValue = ( boardPosition: Point ) => ({
    type: CALCULATE_BOARD_VALUE,
    payload: boardPosition
});