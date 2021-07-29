import { put, select, takeEvery } from 'redux-saga/effects';
import {
  changePlayer,
  checkGameFinished,
  PLAYER_MOVED,
  PlayerMovedAction,
} from '../game/gameAction';
import { registerMove } from './moveAction';
import { calculateBoardValue, setTileValue } from '../board/boardActions';
import { playerToTileValue } from '../../../lib';
import { calculateActiveBoards } from '../activeBoards/activeBoardsActions';
import { getCurrentPlayer } from '../../selectors/appStateSelectors';
import { SagaIterator } from 'redux-saga';

function* playerMoved(action: PlayerMovedAction): SagaIterator {
  const { board, tile } = action.payload;
  const currentPlayer = yield select(getCurrentPlayer);

  const tileValue = playerToTileValue(currentPlayer);

  yield put(registerMove(board, tile, currentPlayer));
  yield put(setTileValue(board, tile, tileValue));
  yield put(changePlayer());
  yield put(calculateBoardValue(board));
  yield put(calculateActiveBoards());
  yield put(checkGameFinished());
}

function* playerMovedSaga() {
  yield takeEvery(PLAYER_MOVED, playerMoved);
}

export default playerMovedSaga;
