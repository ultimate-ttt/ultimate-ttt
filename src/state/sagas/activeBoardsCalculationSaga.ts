import { put, select, takeEvery } from 'redux-saga/effects';
import { GenericAction, SmallBoardInformation, TileValue } from '../AppState';
import { arePointsEqual } from '../../util';
import { CALCULATE_ALLOWED_BOARDS, setAllowedBoards } from '../activeBoards/activeBoardActions';
import { getBoards } from '../selectors/AppStateSelectors';

function* calculateActiveBoards( action: GenericAction ) {
    const boards = yield select( getBoards );
    const lastMove = action.payload;

    let activeBoards = [lastMove];
    const boardLastMovePointsTo = boards.find( ( board: SmallBoardInformation ) =>
                                                   arePointsEqual( board.position, lastMove ) );
    const boardIsFinished = boardLastMovePointsTo.value !== TileValue.Empty;
    if (boardIsFinished) {
        const allUnfinishedBoards = boards.filter(
            ( board: SmallBoardInformation ) =>
                board.value === TileValue.Empty
        );
        activeBoards = allUnfinishedBoards.map( ( board: SmallBoardInformation ) => board.position );
    }

    yield put( setAllowedBoards( activeBoards ) );
}

function* activeBoardsCalculationSaga() {
    yield takeEvery( CALCULATE_ALLOWED_BOARDS, calculateActiveBoards );
}

export default activeBoardsCalculationSaga;