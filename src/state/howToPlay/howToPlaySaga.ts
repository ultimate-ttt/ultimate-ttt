import { delay, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { GenericAction } from '../AppState';
import {
  HOW_TO_PLAY_OPEN,
  HOW_TO_PLAY_STEP_BACKWARD,
  HOW_TO_PLAY_STEP_FORWARD,
  howToPlayStateForward,
} from './howToPlayActions';

function* updateBoardState(action: GenericAction) {
  yield put(howToPlayStateForward());

  yield delay(1000);
  const open = yield select((state) => state.howToPlay.open);
  // todo: because of takeLatest we don't need to check for stepNumber?
  if (open) updateBoardState(action);
}

function* howToPlaySaga() {
  yield takeEvery(HOW_TO_PLAY_OPEN, updateBoardState);
  yield takeLatest(HOW_TO_PLAY_STEP_FORWARD, updateBoardState);
  yield takeLatest(HOW_TO_PLAY_STEP_BACKWARD, updateBoardState);
}

export default howToPlaySaga;
