import { Point } from '../../../lib';

export const SET_ACTIVE_BOARDS = 'activeBoards/set-active-boards';
export const CALCULATE_ACTIVE_BOARDS = 'activeBoards/calculate-active-boards';

export const setActiveBoards = (boards: Point[]) => ({
  type: SET_ACTIVE_BOARDS,
  payload: boards,
});
export const calculateActiveBoards = () => ({
  type: CALCULATE_ACTIVE_BOARDS,
});
