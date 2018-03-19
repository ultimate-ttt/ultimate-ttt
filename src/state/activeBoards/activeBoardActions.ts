import { Point } from '../../util/Point';

export const SET_ACTIVE_BOARDS = 'activeBoardReducer/SetActiveBoard';
export const CALCULATE_ACTIVE_BOARDS = 'activeBoardReducer/CalculateActiveBoard';

export const setActiveBoards = ( boards: Point[], ) => ({
    type: SET_ACTIVE_BOARDS,
    payload: boards
});
export const calculateActiveBoards = ( lastMove: Point ) => ({
    type: CALCULATE_ACTIVE_BOARDS,
    payload: lastMove
});