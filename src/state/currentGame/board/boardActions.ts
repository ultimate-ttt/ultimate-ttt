import { TileValue } from '../../AppState';
import { Point } from '../../../lib/Point';

export const SET_TILE_VALUE = 'board/set-tile-value';
export const SET_BOARD_VALUE = 'board/set-board-value';
export const CALCULATE_BOARD_VALUE = 'board/calculate-board-value';

export const setTileValue = (
  boardPosition: Point,
  tilePosition: Point,
  tileValue: TileValue,
) => ({
  type: SET_TILE_VALUE,
  payload: {
    boardPosition: boardPosition,
    tilePosition: tilePosition,
    tileValue: tileValue,
  },
});

export const setBoardValue = (boardPosition: Point, tileValue: TileValue) => ({
  type: SET_BOARD_VALUE,
  payload: { boardPosition: boardPosition, tileValue: tileValue },
});

export const calculateBoardValue = (boardPosition: Point) => ({
  type: CALCULATE_BOARD_VALUE,
  payload: boardPosition,
});
