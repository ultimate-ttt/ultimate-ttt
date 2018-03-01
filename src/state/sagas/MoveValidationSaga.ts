import { put, takeEvery } from 'redux-saga/effects';
import { PLAYER_MOVED, playerMovedValid } from '../game/gameAction';
import { GenericAction, Player } from '../AppState';

function* playerMoved( action: GenericAction ) {
    const {boardX, boardY, tileX, tileY} = action.payload;
    yield put( playerMovedValid( boardX, boardY, tileX, tileY, Player.Circle ) );
}

function* moveValidationSaga() {
    yield takeEvery( PLAYER_MOVED, playerMoved );
}

export default moveValidationSaga;