import { put, select, takeEvery } from 'redux-saga/effects';
import { GenericAction, SmallBoardInformation, TileValue } from '../AppState';
import { arePointsEqual } from '../../util';
import { CALCULATE_ACTIVE_BOARDS, setActiveBoards } from '../activeBoards/activeBoardActions';
import { getBoards } from '../selectors/AppStateSelectors';

function* calculateActiveBoards( action: GenericAction ) {
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

    yield put( setActiveBoards( activeBoards ) );
}

function* activeBoardsCalculationSaga() {
    yield takeEvery( CALCULATE_ACTIVE_BOARDS, calculateActiveBoards );
}

export default activeBoardsCalculationSaga;