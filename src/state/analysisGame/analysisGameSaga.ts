import { AnalysisGame, GenericAction } from '../AppState';
import { put, select, takeEvery } from 'redux-saga/effects';
import {
  LOAD_FINISHED_GAME_BY_DATE,
  LOAD_FINISHED_GAME_BY_ID,
  LOAD_LATEST_FINISHED_GAME,
  setAnalysisGame,
} from './analysisGameActions';
import {
  getAnalysisGameByDate,
  getAnalysisGameById,
  getLatestAnalysisGame,
} from '../selectors/analysisGame/AnalysisGameStateSelectors';

function* loadFinishedGameById(action: GenericAction) {
  const analysisGame: AnalysisGame | undefined = yield select(
    getAnalysisGameById,
    action.payload,
  );

  // TODO if no results in selector: try over network

  if (analysisGame !== undefined) {
    yield put(setAnalysisGame(analysisGame));
  }
}

function* loadFinishedGameByDate(action: GenericAction) {
  const analysisGame: AnalysisGame | undefined = yield select(
    getAnalysisGameByDate,
    action.payload,
  );

  if (analysisGame !== undefined) {
    yield put(setAnalysisGame(analysisGame));
  }
}

function* loadLatestFinishedGame(action: GenericAction) {
  const analysisGame: AnalysisGame | undefined = yield select(
    getLatestAnalysisGame,
  );

  if (analysisGame !== undefined) {
    yield put(setAnalysisGame(analysisGame));
  }
}

function* loadFinishedGameSaga() {
  yield takeEvery(LOAD_FINISHED_GAME_BY_ID, loadFinishedGameById);
  yield takeEvery(LOAD_FINISHED_GAME_BY_DATE, loadFinishedGameByDate);
  yield takeEvery(LOAD_LATEST_FINISHED_GAME, loadLatestFinishedGame);
}

export default loadFinishedGameSaga;
