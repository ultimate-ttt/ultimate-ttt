import { put, takeEvery } from 'redux-saga/effects';
import {
  GENEREATE_FINISHED_GAMES,
  SAVE_GAME_DATA,
  saveGameData,
  SaveGameDataAction,
  saveGameDataFulfilled,
  saveGameDataPending,
  saveGameDataRejected,
} from './saveFinishedGameDataActions';
import { getApiUrl } from '../../util';
import { GenericAction, SaveState } from '../AppState';
import {
  drawFinishedBoardMock,
  movesForDrawFinishedBoardMock,
} from '../../__mocks__';

function* saveFinishedGameData(action: SaveGameDataAction) {
  if (action.saveOnline) {
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
}

function* generateFinishedGames(action: GenericAction) {
  for (let i = 0; i < action.payload; i++) {
    const finishedGame = {
      id: i.toString() + Math.random().toString(),
      gameState: drawFinishedBoardMock,
      date: new Date().toISOString(),
      winner: null as 'O' | 'X' | null,
      moves: movesForDrawFinishedBoardMock,
      saveState: 'fulfilled' as SaveState,
      errorMessage: '',
    };
    const action = saveGameData(finishedGame);
    action.saveOnline = false;
    yield put(action);
  }
}

function* saveFinishedGameDataSaga() {
  yield takeEvery(SAVE_GAME_DATA, saveFinishedGameData);
  yield takeEvery(GENEREATE_FINISHED_GAMES, generateFinishedGames);
}

export default saveFinishedGameDataSaga;
