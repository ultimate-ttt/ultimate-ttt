import { AnalysisGame, GenericAction } from '../AppState';
import { put, select, takeEvery } from 'redux-saga/effects';
import { LOAD_FINISHED_GAME, setAnalysisGame } from './analysisGameActions';
import { getAnalysisGame } from '../selectors/AppStateSelectors';

function* loadFinishedGame(action: GenericAction) {
  const finishedGame: AnalysisGame | undefined = yield select(
      getAnalysisGame,
      action.payload,
  );
  // TODO if no results in selector: try over network

  if (finishedGame !== undefined) {
    yield put(setAnalysisGame(finishedGame));
  }
}

function* loadFinishedGameSaga() {
  yield takeEvery(LOAD_FINISHED_GAME, loadFinishedGame);
}

export default loadFinishedGameSaga;
