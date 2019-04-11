import { put, select, takeEvery } from 'redux-saga/effects';
import { GenericAction } from '../../AppState';
import {
  CALCULATE_ALLOWED_BOARDS,
  setAllowedBoards,
} from './activeBoardsActions';
import { getMoves } from '../../selectors/AppStateSelectors';
import { TicTacToeGame } from '../../../util';

function* calculateActiveBoards(action: GenericAction) {
  const moves = yield select(getMoves);
  const activeBoards = new TicTacToeGame(moves).getCurrentActiveBoards();
  yield put(setAllowedBoards(activeBoards));
}

function* activeBoardsCalculationSaga() {
  yield takeEvery(CALCULATE_ALLOWED_BOARDS, calculateActiveBoards);
}

export default activeBoardsCalculationSaga;
