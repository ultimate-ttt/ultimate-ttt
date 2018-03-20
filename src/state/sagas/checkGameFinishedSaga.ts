import { put, select, takeEvery } from 'redux-saga/effects';
import { GenericAction, SmallBoardInformation } from '../AppState';
import { CHECK_GAME_FINISHED, gameFinished } from '../game/gameAction';
import { getBoards } from '../selectors/AppStateSelectors';
import { getWinResult } from '../../util/CheckBoard';

function* checkIfGameFinished( action: GenericAction ) {
    const boards = yield select( getBoards );

    // TODO: make this map more beautiful or change the params that the getWinResult function takes
    const mappedBoards = boards.map( (smallBoard: SmallBoardInformation) => {
        return {smallBoardPoint: smallBoard.point, value: smallBoard.value};
    });
    const winResult = getWinResult(mappedBoards);

    const isGameFinished = winResult.isFinished;
    const winningPlayer = winResult.winningPlayer;

    if (isGameFinished) {
        yield put( gameFinished( winningPlayer! ) );
    }
}

function* checkGameFinishedSaga() {
    yield takeEvery( CHECK_GAME_FINISHED, checkIfGameFinished );
}

export default checkGameFinishedSaga;