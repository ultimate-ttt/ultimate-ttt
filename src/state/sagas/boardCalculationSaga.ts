import { put, select, takeEvery } from 'redux-saga/effects';
import { GenericAction, SmallBoardInformation } from '../AppState';
import { CALCULATE_BOARD_VALUE, setBoardValue } from '../board/boardActions';
import { getWinResult } from '../../util/CheckBoard';
import { arePointsEqual, playerToTileValue } from '../../util';
import { getBoards } from '../selectors/AppStateSelectors';

function* calculateWinningBoard( action: GenericAction ) {
    const boardPosition = action.payload;

    const boards = yield select( getBoards );

    const affectedBoard = boards.find(
        ( board: SmallBoardInformation ) =>
            arePointsEqual( board.position, boardPosition )
    ).tiles;

    const winResult = getWinResult( affectedBoard );
    if (winResult.isFinished) {
        const newSmallBoardTileValue = playerToTileValue( winResult.winningPlayer!, true );
        yield put( setBoardValue( boardPosition, newSmallBoardTileValue ) );
    }
}

function* boardCalculationSaga() {
    yield takeEvery( CALCULATE_BOARD_VALUE, calculateWinningBoard );
}

export default boardCalculationSaga;