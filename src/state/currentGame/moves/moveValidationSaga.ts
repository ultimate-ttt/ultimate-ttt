import { put, select, takeEvery } from 'redux-saga/effects';
import {
  changePlayer,
  checkGameFinished,
  PLAYER_MOVED,
  PlayerMovedAction,
} from '../game/gameAction';
import { registerMove } from './moveAction';
import { calculateBoardValue, setTileValue } from '../board/boardActions';
import { playerToTileValue } from '../../../util';
import { calculateActiveBoards } from '../activeBoards/activeBoardsActions';
import { getCurrentPlayer } from '../../selectors/AppStateSelectors';
import { SagaIterator } from 'redux-saga';

function* playerMoved(action: PlayerMovedAction): SagaIterator {
  const { boardPosition, tilePosition } = action.payload;
  const currentPlayer = yield select(getCurrentPlayer);

  const tileValue = playerToTileValue(currentPlayer);

  yield put(registerMove(boardPosition, tilePosition, currentPlayer));
  yield put(setTileValue(boardPosition, tilePosition, tileValue));
  yield put(changePlayer());
  yield put(calculateBoardValue(boardPosition));
  yield put(calculateActiveBoards());
  yield put(checkGameFinished());
}

function* playerMovedSaga() {
  yield takeEvery(PLAYER_MOVED, playerMoved);
}

export default playerMovedSaga;
