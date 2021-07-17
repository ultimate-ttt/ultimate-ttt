import { GenericAction, OnlineState, Player } from '../../AppState';

const initialState: OnlineState = {
  gameId: undefined,
  playerId: undefined,
  player: Player.Cross,
  createGame: {
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
    default: {
      return state;
    }
  }
};

export default onlineReducer;
