import { GameState, GenericAction, Player } from '../../AppState';
import { CHANGE_PLAYER, GAME_FINISHED } from './gameAction';
import { RESTART_GAME } from '../../commonAction';
import produce from 'immer';

const initialState: GameState = {
    currentPlayer: Player.Cross,
    isFinished: false,
    winningPlayer: undefined,
};

const gameReducer = ( state = initialState, action: GenericAction ) => {
    switch (action.type) {

        case CHANGE_PLAYER: {
            const newState = produce( state, draftState => {
                if (draftState.currentPlayer === Player.Cross) {
                    draftState.currentPlayer = Player.Circle;
                } else {
                    draftState.currentPlayer = Player.Cross;
                }
            });
            return newState;
        }
        case GAME_FINISHED: {
            const newState = produce( state, draftState => {

                draftState.isFinished = true;
                draftState.winningPlayer = action.payload;
            });
            return newState;
        }
        case RESTART_GAME: {
            return initialState;
        }

    }

    return state;
};

export default gameReducer;