import { put, select, takeEvery } from 'redux-saga/effects';
import { changePlayer, PLAYER_MOVED, PlayerMovedAction } from '../game/gameAction';
import { AppState } from '../AppState';
import { registerMove } from '../moves/moveAction';
import { setBoardValue, setTileValue } from '../board/boardActions';
import { playerToTileValue } from '../../util';
import { setActiveBoards } from '../activeBoards/activeBoardActions';

const getCurrentPlayer = ( state: AppState ) => state.game.currentPlayer;
// const getBoards = ( state: AppState ) => state.board;

function* playerMoved( action: PlayerMovedAction ) {
    const {boardPoint, tilePoint} = action.payload;
    const currentPlayer = yield select( getCurrentPlayer );
    // const boards = yield select( getBoards );

    const tileValue = playerToTileValue( currentPlayer );

    yield put( registerMove( boardPoint, tilePoint, currentPlayer ) );
    yield put( setTileValue( boardPoint, tilePoint, tileValue ) );
    yield put( changePlayer() );

    const isBoardWon = true; // TODO: do It correctly
    if (isBoardWon) {
        yield put( setBoardValue( boardPoint, currentPlayer ) );
    }

    yield put( setActiveBoards( [tilePoint] ) ); // TODO: check if all boards should be active
}

function* playerMovedSaga() {
    yield takeEvery( PLAYER_MOVED, playerMoved );
}

export default playerMovedSaga;