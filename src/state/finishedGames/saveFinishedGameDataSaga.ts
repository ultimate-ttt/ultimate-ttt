import { put, takeEvery } from 'redux-saga/effects';
import {
  SAVE_GAME_DATA,
  SaveGameDataAction,
  saveGameDataFulfilled,
  saveGameDataPending,
  saveGameDataRejected,
} from './saveFinishedGameDataActions';
import { getApiUrl } from '../../util';

function* saveFinishedGameData(action: SaveGameDataAction) {
  yield put(saveGameDataPending());

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
      yield put(saveGameDataFulfilled(gameId));
    } else {
      yield put(
        saveGameDataRejected(`${response.status}: ${response.statusText}`),
      );
    }
  } catch (e) {
    yield put(saveGameDataRejected(`Request not successful: ${e}`));
  }
}

function* saveFinishedGameDataSaga() {
  yield takeEvery(SAVE_GAME_DATA, saveFinishedGameData);
}

export default saveFinishedGameDataSaga;
