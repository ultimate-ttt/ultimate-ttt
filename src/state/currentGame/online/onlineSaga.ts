import { call, put, select, take, takeEvery } from 'redux-saga/effects';
import { END, eventChannel, SagaIterator } from 'redux-saga';
import {
  CONNECT_GAME_FULFILLED,
  connectGameFulfilled,
  ConnectGameFulfilledAction,
  connectGamePending,
  connectGameRejected,
  CREATE_GAME,
  JOIN_GAME,
  JoinGameAction,
  playerMovedFulfilled,
  playerMovedPending,
  playerMovedRejected,
} from './onlineAction';
import {
  PLAYER_MOVED,
  playerMoved,
  PlayerMovedAction,
} from '../game/gameAction';
import {
  getCurrentPlayer,
  getOnlineGameId,
  getOnlinePlayer,
  getOnlinePlayerId,
} from '../../selectors/appStateSelectors';
import { Player } from '../../AppState';
import { Await, Point, Realtime, RealtimeMoveEvent, Api } from '../../../lib';
import { RealtimeClient } from '@supabase/realtime-js';

function* createGame(): SagaIterator {
  yield put(connectGamePending());
  try {
    const data: Await<ReturnType<typeof Api.createGame>> = yield call(
      Api.createGame,
    );
    yield put(connectGameFulfilled(data.shortId, data.playerId, Player.Cross));
  } catch (e) {
    yield put(connectGameRejected(e.message));
  }
}

function* joinGame(action: JoinGameAction): SagaIterator {
  yield put(connectGamePending());
  try {
    const data: Await<ReturnType<typeof Api.connectGame>> = yield call(
      Api.connectGame,
      action.payload,
    );
    yield put(
      connectGameFulfilled(action.payload, data.playerId, Player.Circle),
    );
  } catch (e) {
    yield put(connectGameRejected(e.message));
  }
}

function* move(action: PlayerMovedAction): SagaIterator {
  const gameId = yield select(getOnlineGameId);
  const playerId = yield select(getOnlinePlayerId);
  if (gameId === undefined || playerId === undefined) {
    return;
  }

  const currentPlayer = yield select(getCurrentPlayer);
  const onlinePlayer = yield select(getOnlinePlayer);
  if (onlinePlayer !== currentPlayer) {
    return;
  }

  yield put(playerMovedPending());
  try {
    yield call(
      Api.move,
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

const createChannel = (client: RealtimeClient, gameId: string) => {
  return eventChannel((emitter) => {
    const eventHandler = (event: RealtimeMoveEvent) => emitter(event);
    const closeHandler = () => emitter(END);

    const subscription = Realtime.subscribe(
      client,
      gameId,
      eventHandler,
      closeHandler,
    );

    return () => {
      subscription.unsubscribe();
    };
  });
};

function* startRealtime(action: ConnectGameFulfilledAction): SagaIterator {
  const client = yield call(Realtime.connect);
  const channel: Await<ReturnType<typeof createChannel>> = yield call(
    createChannel,
    client,
    action.payload.gameId,
  );

  while (true) {
    try {
      const event = yield take(channel);
      if (event.fk_player !== action.payload.player) {
        const action = playerMoved(
          Point.fromXY(event.board_x, event.board_y),
          Point.fromXY(event.tile_x, event.tile_y),
        );
        yield put(action);
      }
    } catch (err) {
      console.error('socket error:', err);
    }
  }
}

function* onlineSaga() {
  yield takeEvery(CREATE_GAME, createGame);
  yield takeEvery(JOIN_GAME, joinGame);
  yield takeEvery(PLAYER_MOVED, move);
  yield takeEvery(CONNECT_GAME_FULFILLED, startRealtime);
}

export default onlineSaga;
