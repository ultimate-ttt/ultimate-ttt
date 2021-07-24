import { put, select, takeEvery } from 'redux-saga/effects';
import { GenericAction } from '../../AppState';
import { CHECK_GAME_FINISHED, gameFinished } from './gameAction';
import { getIsOnlineGame, getMoves } from '../../selectors/appStateSelectors';
import { setActiveBoards } from '../activeBoards/activeBoardsActions';
import { saveGame } from '../../finishedGames/saveFinishedGameActions';
import { getFinishedGame } from '../../selectors/finishedGameStateSelectors';
import { TicTacToeGame } from '../../../lib';
import { SagaIterator } from 'redux-saga';

function* checkIfGameFinished(action: GenericAction): SagaIterator {
  const moves = yield select(getMoves);

  const winResult = new TicTacToeGame(moves).getWinResult();
  const isGameFinished = winResult.isFinished;
  const winningPlayer = winResult.winningPlayer;

  if (isGameFinished) {
    yield put(gameFinished(winningPlayer));
    yield put(setActiveBoards([]));

    const isOnlineGame = yield select(getIsOnlineGame);
    if (!isOnlineGame) {
      // TODO change analysis so that analysis also works for online games
      yield put(saveGame(yield select(getFinishedGame)));
    }
  }
}

function* checkGameFinishedSaga() {
  yield takeEvery(CHECK_GAME_FINISHED, checkIfGameFinished);
}

export default checkGameFinishedSaga;
