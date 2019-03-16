import { Point } from '../../../util/Point';

export const SET_ALLOWED_BOARDS = 'activeBoardsReducer/set-allowed-boards';
export const CALCULATE_ALLOWED_BOARDS = 'activeBoardsReducer/calculate-allowed-boards';

export const setAllowedBoards = ( boards: Point[], ) => ({
    type: SET_ALLOWED_BOARDS,
    payload: boards
});
export const calculateActiveBoards = ( lastMove: Point ) => ({
    type: CALCULATE_ALLOWED_BOARDS,
    payload: lastMove
});