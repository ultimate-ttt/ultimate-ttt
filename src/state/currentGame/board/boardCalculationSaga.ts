import { put, select, takeEvery } from 'redux-saga/effects';
import { GenericAction } from '../../AppState';
import { CALCULATE_BOARD_VALUE, setBoardValue } from './boardActions';
import { playerToTileValue, TicTacToeGame } from '../../../lib';
import { getMoves } from '../../selectors/appStateSelectors';
import { SagaIterator } from 'redux-saga';

function* calculateWinningBoard(action: GenericAction): SagaIterator {
  const boardPosition = action.payload;

  const moves = yield select(getMoves);

  const game = new TicTacToeGame(moves);
  const winResult = game.getWinResultForSmallBoard(boardPosition);
  if (winResult.isFinished) {
    const newSmallBoardTileValue = playerToTileValue(
      winResult.winningPlayer,
      true,
    );
    yield put(setBoardValue(boardPosition, newSmallBoardTileValue));
  }
}

function* boardCalculationSaga() {
  yield takeEvery(CALCULATE_BOARD_VALUE, calculateWinningBoard);
}

export default boardCalculationSaga;
