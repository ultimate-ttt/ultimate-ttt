import { delay, put, takeEvery, race, call, take } from 'redux-saga/effects';
import {
  HOW_TO_PLAY_CLOSE,
  HOW_TO_PLAY_STEP_BACKWARD,
  HOW_TO_PLAY_STEP_FORWARD,
  howToPlayStateForward,
} from './howToPlayActions';

function* updateBoardState() {
  while (true) {
    yield delay(1150);
    yield put(howToPlayStateForward());
  }
}

function* startUpdate() {
  yield race({
    update: call(updateBoardState),
    cancel1: take(HOW_TO_PLAY_CLOSE),
    cancel2: take(HOW_TO_PLAY_STEP_FORWARD),
    cancel3: take(HOW_TO_PLAY_STEP_BACKWARD),
  });
}

function* howToPlaySaga() {
  yield takeEvery(HOW_TO_PLAY_STEP_FORWARD, startUpdate);
  yield takeEvery(HOW_TO_PLAY_STEP_BACKWARD, startUpdate);
}

export default howToPlaySaga;
