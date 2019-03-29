import { AnalysisGame, GenericAction } from '../AppState';
import { SET_ANALYSIS_GAME } from './analysisGameActions';

const initialState: AnalysisGame = {
    board: undefined,
    activeBoards: undefined,
    game: undefined,
    id: undefined,
    moves: undefined
};

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