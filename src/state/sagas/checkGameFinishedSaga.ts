import { put, select, takeEvery } from 'redux-saga/effects';
import { GenericAction } from '../AppState';
import { CHECK_GAME_FINISHED, gameFinished } from '../game/gameAction';
import { getBoards } from '../selectors/AppStateSelectors';
import { getWinResult } from '../../util/CheckBoard';
import { setAllowedBoards } from '../activeBoards/activeBoardsActions';

function* checkIfGameFinished( action: GenericAction ) {
    const boards = yield select( getBoards );

    const winResult = getWinResult( boards );
    const isGameFinished = winResult.isFinished;
    const winningPlayer = winResult.winningPlayer;

    if (isGameFinished) {
        yield put( gameFinished( winningPlayer ) );
        yield put( setAllowedBoards( [] ) );
    }
}

function* checkGameFinishedSaga() {
    yield takeEvery( CHECK_GAME_FINISHED, checkIfGameFinished );
}

export default checkGameFinishedSaga;