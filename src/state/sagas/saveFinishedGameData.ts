import { select, takeEvery } from 'redux-saga/effects';
import { SAVE_FINISHED_GAME_DATA } from '../game/gameAction';
import { GenericAction } from '../AppState';
import { getFinishedGameData } from '../selectors/AppStateSelectors';

function* saveFinishedGameData( action: GenericAction ) {
    const finishedGameData = yield select( getFinishedGameData );

    // TODO now make network request with fetch
}

function* saveFinishedGameDataSaga() {
    yield takeEvery( SAVE_FINISHED_GAME_DATA, saveFinishedGameData );
}

export default saveFinishedGameDataSaga;