import { put, takeEvery } from 'redux-saga/effects';
import { GenericAction, Player } from '../AppState';
import { CHECK_GAME_FINISHED, gameFinished } from '../game/gameAction';

// const getBoards = ( state: AppState ) => state.board;

function* checkIfGameFinished( action: GenericAction ) {
    // const boards = yield select( getBoards );
    //TODO: calculate correctly

    const isGameFinished = false;
    const winningPlayer = Player.Cross;

    if (isGameFinished) {
        yield put( gameFinished( winningPlayer ) );
    }
}

function* checkGameFinishedSaga() {
    yield takeEvery( CHECK_GAME_FINISHED, checkIfGameFinished );
}

export default checkGameFinishedSaga;