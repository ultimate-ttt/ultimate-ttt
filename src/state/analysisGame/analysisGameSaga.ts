import { AnalysisGame, GenericAction, TileValue } from '../AppState';
import { put, select, takeEvery } from 'redux-saga/effects';
import { LOAD_FINISHED_GAME, setAnalysisGame } from './analysisGameActions';
import { getFinishedGame } from '../selectors/AppStateSelectors';
import { arePointsEqual, playerToTileValue } from '../../util';

function resetGame(game: AnalysisGame) {
  const firstMove = game.moves[0];
  game.activeBoards.push(firstMove.tilePosition);

  game.board.forEach((b) => {
    const firstMoveOnThisBoard = arePointsEqual(
      b.position,
      firstMove.boardPosition,
    );
    b.value = TileValue.Empty;
    b.tiles.forEach((t) => {
      const firstMoveOnThisTile =
        firstMoveOnThisBoard &&
        arePointsEqual(t.position, firstMove.tilePosition);
      if (firstMoveOnThisTile) {
        t.value = playerToTileValue(firstMove.player);
      } else {
        t.value = TileValue.Empty;
      }
    });
  });

  return game;
}

function* loadFinishedGame(action: GenericAction) {
  const finishedGame: AnalysisGame | undefined = yield select(
    getFinishedGame,
    action.payload,
  );
  // TODO if no results in selector: try over network

  if (finishedGame !== undefined) {
    const game = resetGame(finishedGame!);
    yield put(setAnalysisGame(game));
  }
}

function* loadFinishedGameSaga() {
  yield takeEvery(LOAD_FINISHED_GAME, loadFinishedGame);
}

export default loadFinishedGameSaga;
