import { put, select, takeEvery } from 'redux-saga/effects';
import { GenericAction } from '../../AppState';
import { CALCULATE_ALLOWED_BOARDS, setAllowedBoards } from './activeBoardsActions';
import { getBoards } from '../../selectors/AppStateSelectors';
import { getNewActiveBoards } from '../../../util/ActiveBoards';

function* calculateActiveBoards( action: GenericAction ) {
    const boards = yield select( getBoards );
    const lastMove = action.payload;

    const activeBoards = getNewActiveBoards(lastMove, boards);

    yield put( setAllowedBoards( activeBoards ) );
}

function* activeBoardsCalculationSaga() {
    yield takeEvery( CALCULATE_ALLOWED_BOARDS, calculateActiveBoards );
}

export default activeBoardsCalculationSaga;