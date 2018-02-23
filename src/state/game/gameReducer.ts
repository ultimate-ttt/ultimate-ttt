import { cloneState, GenericAction, Player } from '../AppState';
import { CHANGE_PLAYER } from '../game/gameAction';

const initialState = {
    currentPlayer: Player.Cross
};

const gameReducer = ( state = initialState, action: GenericAction ) => {
    switch (action.type) {

        case CHANGE_PLAYER: {
            let clone = cloneState( state );

            if (clone.currentPlayer === Player.Cross) {
                clone.currentPlayer = Player.Circle;
            } else {
                clone.currentPlayer = Player.Cross;
            }

            return clone;
        }

        default: {
            return state;
        }
    }
};

export default gameReducer;