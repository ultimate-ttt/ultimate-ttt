import { cloneState, GameState, GenericAction, Player } from '../AppState';
import { CHANGE_PLAYER, GAME_FINISHED } from '../game/gameAction';

const initialState: GameState = {
    currentPlayer: Player.Cross,
    isFinished: false,
    winningPlayer:  undefined,
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
        case GAME_FINISHED: {
            let clone = cloneState( state );

            clone.isFinished = true;
            clone.winningPlayer = action.payload;

            return clone;
        }

        default: {
            return state;
        }
    }
};

export default gameReducer;