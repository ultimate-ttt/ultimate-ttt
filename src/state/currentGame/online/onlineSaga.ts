import { call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  CREATE_GAME,
  CreateGameAction,
  createGameFulfilled,
  createGamePending,
  createGameRejected,
  JOIN_GAME,
  JoinGameAction,
} from './onlineAction';
import { PLAYER_MOVED, PlayerMovedAction } from '../game/gameAction';
import { CreateGameResponse, fetchCreateGame } from '../../../lib/Api';

function* playerMoved(action: PlayerMovedAction): SagaIterator {}
function* createGame(action: CreateGameAction): SagaIterator {
  yield put(createGamePending());
  try {
    const data: CreateGameResponse = yield call(fetchCreateGame);
    yield put(createGameFulfilled(data.shortId, data.playerId));
  } catch (e) {
    yield put(createGameRejected(e));
  }
}
function* joinGame(action: JoinGameAction): SagaIterator {}

function* onlineSaga() {
  yield takeEvery(PLAYER_MOVED, playerMoved);
  yield takeEvery(CREATE_GAME, createGame);
  yield takeEvery(JOIN_GAME, joinGame);
}

export default onlineSaga;
