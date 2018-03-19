import { put, select, takeEvery } from 'redux-saga/effects';
import { changePlayer, PLAYER_MOVED, PlayerMovedAction } from '../game/gameAction';
import { AppState, SmallBoardInformation, TileValue } from '../AppState';
import { registerMove } from '../moves/moveAction';
import { calculateBoardValue, setTileValue } from '../board/boardActions';
import { arePointsEqual, playerToTileValue } from '../../util';
import { setActiveBoards } from '../activeBoards/activeBoardActions';

const getCurrentPlayer = ( state: AppState ) => state.game.currentPlayer;

const getLastMove = ( state: AppState ) => state.moves[state.moves.length - 1];
const getBoards = ( state: AppState ) => state.board;

function* playerMoved( action: PlayerMovedAction ) {
    const {boardPoint, tilePoint} = action.payload;
    const currentPlayer = yield select( getCurrentPlayer );

    const tileValue = playerToTileValue( currentPlayer );

    yield put( registerMove( boardPoint, tilePoint, currentPlayer ) );
    yield put( setTileValue( boardPoint, tilePoint, tileValue ) );
    yield put( changePlayer() );
    yield put( calculateBoardValue( boardPoint ) );

    const boards = yield select( getBoards );

    // TODO Separate
    let activeBoards = [tilePoint];
    const lastMove = yield select( getLastMove );
    const boardLastMovePointsTo = boards.find( ( board: SmallBoardInformation ) =>
                                                   arePointsEqual( board.point, lastMove.smallBoardPoint ) );
    const boardIsFinished = boardLastMovePointsTo.value !== TileValue.Empty;
    if (boardIsFinished) {
        // todo activate all boards that are not finished
        const allUnfinishedBoards = boards.filter( ( board: SmallBoardInformation ) =>
                                                       board.value === TileValue.Empty );
        activeBoards = allUnfinishedBoards.map( ( board: SmallBoardInformation ) => board.point );
    }

    // TODO if small board last move points to has a value other than TileValue.Empty then all should be active.
    yield put( setActiveBoards( activeBoards ) ); // TODO: check if all boards should be active
}

function* playerMovedSaga() {
    yield takeEvery( PLAYER_MOVED, playerMoved );
}

export default playerMovedSaga;