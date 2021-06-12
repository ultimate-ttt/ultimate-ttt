import { put, select, takeEvery } from 'redux-saga/effects';
import { GenericAction } from '../../AppState';
import {
  CALCULATE_ACTIVE_BOARDS,
  setActiveBoards,
} from './activeBoardsActions';
import { getMoves } from '../../selectors/AppStateSelectors';
import { TicTacToeGame } from '../../../util';
import { SagaIterator } from 'redux-saga';

function* calculateActiveBoards(action: GenericAction): SagaIterator {
  const moves = yield select(getMoves);
  const activeBoards = new TicTacToeGame(moves).getCurrentActiveBoards();
  yield put(setActiveBoards(activeBoards));
}

function* activeBoardsCalculationSaga() {
  yield takeEvery(CALCULATE_ACTIVE_BOARDS, calculateActiveBoards);
}

export default activeBoardsCalculationSaga;
