import {
  call,
  put,
  select,
  take,
  takeEvery,
  cancelled,
  race,
} from 'redux-saga/effects';
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
  GAME_FINISHED,
  PLAYER_MOVED,
  playerMoved,
  PlayerMovedAction,
} from '../game/gameAction';
import { getCurrentPlayer } from '../../selectors/appStateSelectors';
import {
  getIsOnlineGame,
  getOnlineGameId,
  getOnlinePlayer,
  getOnlinePlayerId,
} from '../../selectors/onlineStateSelectors';
import { Player } from '../../AppState';
import { Await, Point, Realtime, RealtimeMoveEvent, Api } from '../../../lib';
import { RealtimeClient } from '@supabase/realtime-js';
import { restartGame } from '../../commonAction';

function* createGame(): SagaIterator {
  yield put(connectGamePending());
  try {
    const data: Await<ReturnType<typeof Api.createGame>> = yield call(
      Api.createGame,
    );
    yield put(connectGameFulfilled(data.shortId, data.playerId, Player.Cross));
    yield put(restartGame());
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
    yield put(restartGame());
  } catch (e) {
    yield put(connectGameRejected(e.message));
  }
}

function* move(action: PlayerMovedAction): SagaIterator {
  const isOnlineGame = yield select(getIsOnlineGame);
  if (!isOnlineGame) {
    return;
  }

  const currentPlayer = yield select(getCurrentPlayer);
  const onlinePlayer = yield select(getOnlinePlayer);
  if (onlinePlayer !== currentPlayer) {
    return;
  }

  const gameId = yield select(getOnlineGameId);
  const playerId = yield select(getOnlinePlayerId);
  yield put(playerMovedPending());
  try {
    yield call(
      Api.move,
      gameId,
      playerId,
      action.payload.board,
      action.payload.tile,
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

function* subscribeRealtime(action: ConnectGameFulfilledAction): SagaIterator {
  const client: Await<ReturnType<typeof Realtime.connect>> = yield call(
    Realtime.connect,
  );
  const channel: Await<ReturnType<typeof createChannel>> = yield call(
    createChannel,
    client,
    action.payload.gameId,
  );

  try {
    while (true) {
      try {
        const event: RealtimeMoveEvent = yield take(channel);
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
  } finally {
    if (yield cancelled()) {
      channel.close();
      yield call(client.disconnect);
    }
  }
}

function* startRealtime(action: ConnectGameFulfilledAction): SagaIterator {
  yield race({
    realtime: call(subscribeRealtime, action),
    unsubscribe: take(GAME_FINISHED),
  });
}

function* onlineSaga() {
  yield takeEvery(CREATE_GAME, createGame);
  yield takeEvery(JOIN_GAME, joinGame);
  yield takeEvery(PLAYER_MOVED, move);
  yield takeEvery(CONNECT_GAME_FULFILLED, startRealtime);
}

export default onlineSaga;
