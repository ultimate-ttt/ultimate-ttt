import { put, select, takeEvery } from 'redux-saga/effects';
import { GenericAction } from '../../AppState';
import { CHECK_GAME_FINISHED, gameFinished } from './gameAction';
import { getMoves } from '../../selectors/AppStateSelectors';
import { setAllowedBoards } from '../activeBoards/activeBoardsActions';
import { saveGameData } from '../../finishedGames/saveFinishedGameDataActions';
import { getFinishedGameData } from '../../selectors/FinishedGameStateSelectors';
import { TicTacToeGame } from '../../../util';

function* checkIfGameFinished(action: GenericAction) {
  const moves = yield select(getMoves);

  const winResult = new TicTacToeGame(moves).getWinResult();
  const isGameFinished = winResult.isFinished;
  const winningPlayer = winResult.winningPlayer;

  if (isGameFinished) {
    yield put(gameFinished(winningPlayer));
    yield put(setAllowedBoards([]));
    yield put(saveGameData(yield select(getFinishedGameData)));
  }
}

function* checkGameFinishedSaga() {
  yield takeEvery(CHECK_GAME_FINISHED, checkIfGameFinished);
}

export default checkGameFinishedSaga;
