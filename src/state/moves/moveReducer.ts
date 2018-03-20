import { cloneState, GenericAction, Move } from '../AppState';
import { REGISTER_MOVE } from './moveAction';

const initialState: Move[] = [];

const moveReducer = ( state = initialState, action: GenericAction ) => {
    switch (action.type) {
        case REGISTER_MOVE: {
            let clone = cloneState( state );

            const {bigBoardPoint, smallBoardPoint, player} = action.payload;
            clone.push( {
                boardPosition: bigBoardPoint,
                tilePosition: smallBoardPoint,
                player: player,
                moveNumber: clone.length + 1
            } );

            return clone;
        }

        default: {
            return state;
        }
    }
};

export default moveReducer;