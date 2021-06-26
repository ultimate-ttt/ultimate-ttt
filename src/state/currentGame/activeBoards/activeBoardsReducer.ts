import { Point, TicTacToeGame } from '../../../lib';
import { GenericAction } from '../../AppState';
import { SET_ACTIVE_BOARDS } from './activeBoardsActions';
import { RESTART_GAME } from '../../commonAction';

const initialState: Point[] = new TicTacToeGame([]).getCurrentActiveBoards();

const activeBoardsReducer = (state = initialState, action: GenericAction) => {
  switch (action.type) {
    case SET_ACTIVE_BOARDS: {
      return action.payload;
    }
    case RESTART_GAME: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default activeBoardsReducer;
