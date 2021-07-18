import { call, put, select, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  CREATE_GAME,
  CreateGameAction,
  connectGameFulfilled,
  connectGamePending,
  connectGameRejected,
  JOIN_GAME,
  JoinGameAction,
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
  getCurrentPlayer,
  getOnlineGameId,
  getOnlinePlayer,
  getOnlinePlayerId,
} from '../../selectors/appStateSelectors';
import { Player } from '../../AppState';

function* createGame(action: CreateGameAction): SagaIterator {
  yield put(connectGamePending());
  try {
    const data: CreateGameResponse = yield call(postCreateGame);
    yield put(connectGameFulfilled(data.shortId, data.playerId, Player.Cross));
  } catch (e) {
    yield put(connectGameRejected(e.message));
  }
}

function* joinGame(action: JoinGameAction): SagaIterator {
  yield put(connectGamePending());
  try {
    const data: ConnectGameResponse = yield call(
      postConnectGame,
      action.payload,
    );
    yield put(
      connectGameFulfilled(action.payload, data.playerId, Player.Circle),
    );
  } catch (e) {
    yield put(connectGameRejected(e.message));
  }
}

function* playerMoved(action: PlayerMovedAction): SagaIterator {
  const currentPlayer = yield select(getCurrentPlayer);
  const onlinePlayer = yield select(getOnlinePlayer);

  // TODO not sure if this works correctly
  if (onlinePlayer !== currentPlayer) {
    return;
  }

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
    yield put(playerMovedRejected(e.message));
  }
}

function* onlineSaga() {
  yield takeEvery(CREATE_GAME, createGame);
  yield takeEvery(JOIN_GAME, joinGame);
  yield takeEvery(PLAYER_MOVED, playerMoved);
}

export default onlineSaga;
