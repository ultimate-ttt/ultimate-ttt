import { call, put, select, takeEvery } from 'redux-saga/effects';
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
  playerMovedFulfilled,
  playerMovedPending,
  playerMovedRejected,
} from './onlineAction';
import { PLAYER_MOVED, PlayerMovedAction } from '../game/gameAction';
import {
  ConnectGameResponse,
  CreateGameResponse,
  postConnectGame,
  postCreateGame,
  postMove,
} from '../../../lib/Api';
import {
  getOnlineGameId,
  getOnlinePlayerId,
} from '../../selectors/appStateSelectors';

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

function* playerMoved(action: PlayerMovedAction): SagaIterator {
  yield put(playerMovedPending());
  try {
    const gameId = yield select(getOnlineGameId);
    const playerId = yield select(getOnlinePlayerId);
    yield call(
      postMove,
      gameId,
      playerId,
      action.payload.boardPosition,
      action.payload.tilePosition,
    );
    yield put(playerMovedFulfilled());
  } catch (e) {
    yield put(playerMovedRejected(e));
  }
}

function* onlineSaga() {
  yield takeEvery(CREATE_GAME, createGame);
  yield takeEvery(JOIN_GAME, joinGame);
  yield takeEvery(PLAYER_MOVED, playerMoved);
}

export default onlineSaga;
