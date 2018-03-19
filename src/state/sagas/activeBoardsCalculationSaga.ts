import { put, select, takeEvery } from 'redux-saga/effects';
import { AppState, GenericAction, SmallBoardInformation, TileValue } from '../AppState';
import { arePointsEqual } from '../../util';
import { CALCULATE_ACTIVE_BOARDS, setActiveBoards } from '../activeBoards/activeBoardActions';

const getBoards = ( state: AppState ) => state.board;

function* calculateactiveBoards( action: GenericAction ) {
    const boards = yield select( getBoards );
    const lastMove = action.payload;

    let activeBoards = [lastMove];
    const boardLastMovePointsTo = boards.find( ( board: SmallBoardInformation ) =>
                                                   arePointsEqual( board.point, lastMove ) );
    const boardIsFinished = boardLastMovePointsTo.value !== TileValue.Empty;
    if (boardIsFinished) {
        const allUnfinishedBoards = boards.filter(
            ( board: SmallBoardInformation ) =>
                board.value === TileValue.Empty
        );
        activeBoards = allUnfinishedBoards.map( ( board: SmallBoardInformation ) => board.point );
    }

    yield put( setActiveBoards( activeBoards ) ); // TODO: check if all boards should be active
}

function* activeBoardsCalculationSaga() {
    yield takeEvery( CALCULATE_ACTIVE_BOARDS, calculateactiveBoards );
}

export default activeBoardsCalculationSaga;