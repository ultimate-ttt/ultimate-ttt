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
  joinGameFulfilled,
  joinGamePending,
  joinGameRejected,
} from './onlineAction';
import { PLAYER_MOVED, PlayerMovedAction } from '../game/gameAction';
import {
  ConnectGameResponse,
  CreateGameResponse,
  postConnectGame,
  postCreateGame,
} from '../../../lib/Api';

function* playerMoved(action: PlayerMovedAction): SagaIterator {}

function* createGame(action: CreateGameAction): SagaIterator {
  yield put(createGamePending());
  try {
    const data: CreateGameResponse = yield call(postCreateGame);
    yield put(createGameFulfilled(data.shortId, data.playerId));
  } catch (e) {
    yield put(createGameRejected(e));
  }
}

function* joinGame(action: JoinGameAction): SagaIterator {
  yield put(joinGamePending());
  try {
    const data: ConnectGameResponse = yield call(
      postConnectGame,
      action.payload,
    );
    yield put(joinGameFulfilled(action.payload, data.playerId));
  } catch (e) {
    yield put(joinGameRejected(e));
  }
}

function* onlineSaga() {
  yield takeEvery(PLAYER_MOVED, playerMoved);
  yield takeEvery(CREATE_GAME, createGame);
  yield takeEvery(JOIN_GAME, joinGame);
}

export default onlineSaga;
