import { GenericAction } from '../AppState';
import { SET_ANALYSIS_GAME } from './analysisGameActions';

const initialState = {};

export const analysisGameReducer = ( state = initialState, action: GenericAction ) => {
    switch (action.type) {
        case SET_ANALYSIS_GAME: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
};