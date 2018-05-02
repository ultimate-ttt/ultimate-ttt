import { cloneState, GenericAction, Move } from '../AppState';
import { REGISTER_MOVE } from './moveAction';
import { RESTART_GAME } from '../commonAction';

const initialState: Move[] = [];

const moveReducer = ( state = initialState, action: GenericAction ) => {
    switch (action.type) {
        case REGISTER_MOVE: {
            let clone = cloneState( state );

            const {boardPosition: boardPosition, tilePosition: tilePosition, player} = action.payload;
            clone.push( {
                boardPosition: boardPosition,
                tilePosition: tilePosition,
                player: player,
                moveNumber: clone.length + 1
            } );

            return clone;
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