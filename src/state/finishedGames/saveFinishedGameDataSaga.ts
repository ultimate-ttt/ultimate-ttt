import { put, takeEvery } from 'redux-saga/effects';
import {
    SAVE_GAME_DATA,
    SaveGameDataAction,
    saveGameDataFulfilled,
    saveGameDataPending,
    saveGameDataRejected
} from './saveFinishedGameDataActions';
import { getApiUrl } from '../../util/ApiUrl';

function* saveFinishedGameData( action: SaveGameDataAction ) {
    yield put( saveGameDataPending() );

    const apiUrl = getApiUrl();

    const response = yield fetch( apiUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( action.payload )
    } );

    if (!response.ok) {
        yield put( saveGameDataRejected( `${response.status}: ${response.statusText}` ) );
    } else {
        yield put( saveGameDataFulfilled() );
    }
}

function* saveFinishedGameDataSaga() {
    yield takeEvery( SAVE_GAME_DATA, saveFinishedGameData );
}

export default saveFinishedGameDataSaga;