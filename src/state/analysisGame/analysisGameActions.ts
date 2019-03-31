import { AnalysisGame } from '../AppState';

export const LOAD_FINISHED_GAME = 'analysisGameReducer/load-finished-game';
export const SET_ANALYSIS_GAME = 'analysisGameReducer/set-analysis-game';
export const MOVE_FORWARD_IN_HISTORY = 'analysisGameReducer/move-forward-in-history';
export const MOVE_BACKWARD_IN_HISTORY = 'analysisGameReducer/move-backward-in-history';

export const loadFinishedGame = (id: string) => ({
   type: LOAD_FINISHED_GAME,
   payload: id
});

export const setAnalysisGame = (analysisGame: AnalysisGame) => ({
    type: SET_ANALYSIS_GAME,
    payload: analysisGame
});

export const moveForwardInHistory = (numberOfMoves: number) => ({
   type: MOVE_FORWARD_IN_HISTORY,
   payload: numberOfMoves
});

export const moveBackwardInHistory = (numberOfMoves: number) => ({
   type: MOVE_BACKWARD_IN_HISTORY,
   payload: numberOfMoves
});