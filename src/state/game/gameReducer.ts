import { cloneState, GameState, GenericAction, Player } from '../AppState';
import { CHANGE_PLAYER, GAME_FINISHED } from '../game/gameAction';
import { RESTART_GAME } from '../commonAction';

const initialState: GameState = {
    currentPlayer: Player.Cross,
    isFinished: false,
    isReplay: false,
    winningPlayer: undefined,
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
        case RESTART_GAME: {
            initialState.isReplay = true;
            return initialState;
        }

    }

    return state;
};

export default gameReducer;