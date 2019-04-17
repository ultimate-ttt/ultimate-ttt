import { GenericAction, MoveState } from '../../AppState';
import { REGISTER_MOVE } from './moveAction';
import { RESTART_GAME } from '../../commonAction';
import produce from 'immer';

const initialState: MoveState[] = [];

const moveReducer = (state = initialState, action: GenericAction) => {
  switch (action.type) {
    case REGISTER_MOVE: {
      const {
        boardPosition,
        tilePosition,
        player,
      } = action.payload;

      const newState = produce(state, (draftState) => {
        draftState.push({
          boardPosition: boardPosition,
          tilePosition: tilePosition,
          player: player,
          moveNumber: draftState.length + 1,
        });
      });

      return newState;
    }
    case RESTART_GAME: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default moveReducer;
