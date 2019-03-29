import { AnalysisGame } from '../AppState';

export const LOAD_FINISHED_GAME = 'analysisGameReducer/load-finished-game';
export const SET_ANALYSIS_GAME = 'analysisGameReducer/set-analysis-game';

export const loadFinishedGame = (id: string) => ({
   type: LOAD_FINISHED_GAME,
   payload: id
});

export const setAnalysisGame = (analysisGame: AnalysisGame) => ({
    type: SET_ANALYSIS_GAME,
    payload: analysisGame
});