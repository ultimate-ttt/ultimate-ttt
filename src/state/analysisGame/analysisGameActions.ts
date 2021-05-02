import { AnalysisGame } from '../AppState';

export const LOAD_FINISHED_GAME_BY_ID =
  'analysisGameReducer/load-finished-game-by-id';
export const LOAD_FINISHED_GAME_BY_DATE =
  'analysisGameReducer/load-finished-game-by-date';
export const LOAD_LATEST_FINISHED_GAME =
  'analysisGameReducer/load-latest-finished-game';
export const SET_ANALYSIS_GAME = 'analysisGameReducer/set-analysis-game';
export const RESET_ANALYSIS_GAME = 'analysisGameReducer/reset-analysis-game';
export const MOVE_FORWARD_IN_HISTORY =
  'analysisGameReducer/move-forward-in-history';
export const MOVE_BACKWARD_IN_HISTORY =
  'analysisGameReducer/move-backward-in-history';

export const loadFinishedGameById = (id: string) => ({
  type: LOAD_FINISHED_GAME_BY_ID,
  payload: id,
});

export const loadFinishedGameByDate = (date: Date) => ({
  type: LOAD_FINISHED_GAME_BY_DATE,
  payload: date,
});

export const loadLatestFinishedGame = () => ({
  type: LOAD_LATEST_FINISHED_GAME,
});

export const setAnalysisGame = (analysisGame: AnalysisGame) => ({
  type: SET_ANALYSIS_GAME,
  payload: analysisGame,
});

export const resetAnalysisGame = () => ({
  type: RESET_ANALYSIS_GAME,
});

export const moveForwardInHistory = (numberOfMoves: number) => ({
  type: MOVE_FORWARD_IN_HISTORY,
  payload: numberOfMoves,
});

export const moveBackwardInHistory = (numberOfMoves: number) => ({
  type: MOVE_BACKWARD_IN_HISTORY,
  payload: numberOfMoves,
});
