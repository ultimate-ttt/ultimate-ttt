import { cloneState, FinishedGameState, GenericAction } from '../AppState';
import {
    SAVE_GAME_DATA, SAVE_GAME_DATA_FULFILLED,
    SAVE_GAME_DATA_PENDING,
    SAVE_GAME_DATA_REJECTED,
} from './saveFinishedGameDataActions';

const initialState: FinishedGameState[] = [];

const finishedGameReducer = ( state = initialState, action: GenericAction ) => {
    switch (action.type) {

        case SAVE_GAME_DATA: {
            const clone = cloneState( state );
            clone.push( action.payload );
            return clone;
        }
        case SAVE_GAME_DATA_PENDING: {
            const clone = cloneState( state );
            clone[clone.length - 1].saveState = 'pending';
            return clone;
        }
        case SAVE_GAME_DATA_REJECTED: {
            let clone = cloneState( state );
            // we don't know for sure actually if the last element is the element this corresponds to.
            // client id should be introduced later
            const lastElement = clone[clone.length - 1];
            lastElement.saveState = 'rejected';
            lastElement.errorMessage = action.payload;
            clone[clone.length - 1] = lastElement;
            return clone;
        }
        case SAVE_GAME_DATA_FULFILLED: {
            const clone = cloneState( state );
            const lastElement = clone[clone.length - 1];
            lastElement.saveState = 'fulfilled';
            lastElement.id = action.payload;
            return clone;
        }
    }

    return state;
};

export default finishedGameReducer;