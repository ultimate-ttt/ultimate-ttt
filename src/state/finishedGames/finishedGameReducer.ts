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
            let clone = cloneState(state);

            clone.push(action.payload);
            return clone;
        }
        case SAVE_GAME_DATA_PENDING: {
            let clone = cloneState(state);
            clone[clone.length - 1].saveState = 'pending';
            return clone;
        }
        case SAVE_GAME_DATA_REJECTED: {
            let clone = cloneState(state);
            // we don't know for sure actually if the last element is the element this corresponds to.
            // id should be introduced later
            let lastElement = clone[clone.length - 1];
            lastElement.saveState = 'rejected';
            lastElement.errorMessage = action.payload;
            return clone;
        }
        case SAVE_GAME_DATA_FULFILLED: {
            let clone = cloneState(state);
            clone[clone.length - 1].saveState = 'fulfilled';
            return clone;
        }
    }

    return state;
};

export default finishedGameReducer;