import { put, select, takeEvery } from 'redux-saga/effects';
import { changePlayer, PLAYER_MOVED, PlayerMovedAction } from '../game/gameAction';
import { AppState } from '../AppState';
import { registerMove } from '../moves/moveAction';
import { setTileValue } from '../tiles/tileAction';
import { playerToTileValue } from '../../util';

const getCurrentPlayer = ( state: AppState ) => state.game.currentPlayer;

function* playerMoved( action: PlayerMovedAction ) {
    const {boardPoint, tilePoint} = action.payload;
    const currentPlayer = yield select( getCurrentPlayer );
    const tileValue = playerToTileValue( currentPlayer );

    yield put( registerMove( boardPoint, tilePoint, currentPlayer ) );
    yield put( setTileValue( boardPoint, tilePoint, tileValue ) );
    yield put( changePlayer() );
}

function* playerMovedSaga() {
    yield takeEvery( PLAYER_MOVED, playerMoved );
}

export default playerMovedSaga;