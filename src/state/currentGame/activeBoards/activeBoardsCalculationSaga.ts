import { put, select, takeEvery } from 'redux-saga/effects';
import { GenericAction } from '../../AppState';
import {
  CALCULATE_ACTIVE_BOARDS,
  setActiveBoards,
} from './activeBoardsActions';
import { getMoves } from '../../selectors/AppStateSelectors';
import { TicTacToeGame } from '../../../util';

function* calculateActiveBoards(action: GenericAction) {
  const moves = yield select(getMoves);
  const activeBoards = new TicTacToeGame(moves).getCurrentActiveBoards();
  yield put(setActiveBoards(activeBoards));
}

function* activeBoardsCalculationSaga() {
  yield takeEvery(CALCULATE_ACTIVE_BOARDS, calculateActiveBoards);
}

export default activeBoardsCalculationSaga;
