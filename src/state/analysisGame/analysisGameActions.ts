import { AnalysisGame } from '../AppState';

export const LOAD_FINISHED_GAME_BY_ID =
  'analysisGameReducer/load-finished-game-by-id';
export const LOAD_LATEST_FINISHED_GAME =
  'analysisGameReducer/load-latest-finished-game';
export const SET_ANALYSIS_GAME = 'analysisGameReducer/set-analysis-game';
export const MOVE_FORWARD_IN_HISTORY =
  'analysisGameReducer/move-forward-in-history';
export const MOVE_BACKWARD_IN_HISTORY =
  'analysisGameReducer/move-backward-in-history';

export const loadFinishedGame = (id: string) => ({
  type: LOAD_FINISHED_GAME_BY_ID,
  payload: id,
});

export const loadLatestFinishedGame = () => ({
  type: LOAD_LATEST_FINISHED_GAME,
});

export const setAnalysisGame = (analysisGame: AnalysisGame) => ({
  type: SET_ANALYSIS_GAME,
  payload: analysisGame,
});

export const moveForwardInHistory = (numberOfMoves: number) => ({
  type: MOVE_FORWARD_IN_HISTORY,
  payload: numberOfMoves,
});

export const moveBackwardInHistory = (numberOfMoves: number) => ({
  type: MOVE_BACKWARD_IN_HISTORY,
  payload: numberOfMoves,
});
