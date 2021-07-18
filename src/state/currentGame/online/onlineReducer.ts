import { GenericAction, OnlineState, Player } from '../../AppState';
import {
  CONNECT_GAME_FULFILLED,
  CONNECT_GAME_PENDING,
  CONNECT_GAME_REJECTED,
  ConnectGameFulfilledAction,
  PLAYER_MOVED_FULFILLED,
  PLAYER_MOVED_PENDING,
  PLAYER_MOVED_REJECTED,
} from './onlineAction';
import produce from 'immer';

const initialState: OnlineState = {
  gameId: undefined,
  playerId: undefined,
  player: Player.Cross,
  connectGame: {
    saveState: '',
    errorMessage: '',
  },
  lastMove: {
    saveState: '',
    errorMessage: '',
  },
};

const onlineReducer = (
  state = initialState,
  action: GenericAction,
): OnlineState => {
  switch (action.type) {
    case CONNECT_GAME_PENDING: {
      return produce(state, (draftState) => {
        draftState.connectGame.saveState = 'pending';
      });
    }
    case CONNECT_GAME_REJECTED: {
      return produce(state, (draftState) => {
        draftState.connectGame.saveState = 'rejected';
        draftState.connectGame.errorMessage = action.payload;
      });
    }
    case CONNECT_GAME_FULFILLED: {
      const fulfilled = (action as ConnectGameFulfilledAction).payload;
      return produce(state, (draftState) => {
        draftState.connectGame.saveState = 'fulfilled';
        draftState.gameId = fulfilled.gameId;
        draftState.playerId = fulfilled.playerId;
        draftState.player = fulfilled.player;
      });
    }

    case PLAYER_MOVED_PENDING: {
      return produce(state, (draftState) => {
        draftState.lastMove.saveState = 'pending';
      });
    }
    case PLAYER_MOVED_REJECTED: {
      return produce(state, (draftState) => {
        draftState.lastMove.saveState = 'rejected';
        draftState.lastMove.errorMessage = action.payload;
      });
    }
    case PLAYER_MOVED_FULFILLED: {
      return produce(state, (draftState) => {
        draftState.lastMove.saveState = 'fulfilled';
      });
    }

    default: {
      return state;
    }
  }
};

export default onlineReducer;
