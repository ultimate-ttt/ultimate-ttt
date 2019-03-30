import { AnalysisGame, GenericAction, Player } from '../AppState';
import { SET_ANALYSIS_GAME } from './analysisGameActions';

const initialState: AnalysisGame = {
    id: '',
    board: [],
    activeBoards: [],
    game: {
        isFinished: true,
        winningPlayer: null,
        currentPlayer: Player.Cross
    },
    moves: [],
    currentMove: 1
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