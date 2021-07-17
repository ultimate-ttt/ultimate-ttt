import { put, takeEvery } from 'redux-saga/effects';
import {
  SAVE_GAME,
  SaveGameAction,
  saveGameFulfilled,
  saveGamePending,
  saveGameRejected,
} from './saveFinishedGameActions';
import { getApiUrl } from '../../lib';

function* saveFinishedGame(action: SaveGameAction): any {
  if (action.saveOnline) {
    yield put(saveGamePending());

    const apiUrl = getApiUrl();

    try {
      const response = yield fetch(apiUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(action.payload),
      });

      if (response.ok) {
        const gameId = yield response.text();
        yield put(saveGameFulfilled(gameId));
      } else {
        yield put(
          saveGameRejected(`${response.status}: ${response.statusText}`),
        );
      }
    } catch (e) {
      yield put(saveGameRejected(`Request not successful: ${e}`));
    }
  }
}

function* saveFinishedGameSaga() {
  yield takeEvery(SAVE_GAME, saveFinishedGame);
}

export default saveFinishedGameSaga;
