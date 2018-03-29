import { put, select, takeEvery } from 'redux-saga/effects';
import { changePlayer, checkGameFinished, PLAYER_MOVED, PlayerMovedAction } from '../game/gameAction';
import { registerMove } from '../moves/moveAction';
import { calculateBoardValue, setTileValue } from '../board/boardActions';
import { playerToTileValue } from '../../util';
import { calculateActiveBoards } from '../activeBoards/activeBoardActions';
import { getCurrentPlayer } from '../selectors/AppStateSelectors';

function* playerMoved( action: PlayerMovedAction ) {
    const {boardPosition, tilePosition} = action.payload;
    const currentPlayer = yield select( getCurrentPlayer );

    const tileValue = playerToTileValue( currentPlayer );

    yield put( registerMove( boardPosition, tilePosition, currentPlayer ) );
    yield put( setTileValue( boardPosition, tilePosition, tileValue ) );
    yield put( changePlayer() );
    yield put( calculateBoardValue( boardPosition ) );
    yield put( calculateActiveBoards( tilePosition ) );
    yield put( checkGameFinished() ); // TODO: maybe calculateBoardValue should call checkGameFinished.
}

function* playerMovedSaga() {
    yield takeEvery( PLAYER_MOVED, playerMoved );
}

export default playerMovedSaga;