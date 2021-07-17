import { takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  CREATE_GAME,
  CreateGameAction,
  JOIN_GAME,
  JoinGameAction,
} from './onlineAction';
import { PLAYER_MOVED, PlayerMovedAction } from '../game/gameAction';

function* playerMoved(action: PlayerMovedAction): SagaIterator {}
function* createGame(action: CreateGameAction): SagaIterator {}
function* joinGame(action: JoinGameAction): SagaIterator {}

function* onlineSaga() {
  yield takeEvery(PLAYER_MOVED, playerMoved);
  yield takeEvery(CREATE_GAME, createGame);
  yield takeEvery(JOIN_GAME, joinGame);
}

export default onlineSaga;
