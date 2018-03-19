import { Point } from '../../util/Point';

export const SET_ACTIVE_BOARDS = 'activeBoardReducer/SetActiveBoard';

export const setActiveBoards = ( boards: Point[], ) => ({
    type: SET_ACTIVE_BOARDS,
    payload: boards
});