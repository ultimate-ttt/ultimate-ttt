import { put, select, takeEvery } from 'redux-saga/effects';
import {
    SAVE_GAME_DATA,
    SaveGameDataAction,
    saveGameDataFulfilled,
    saveGameDataPending,
    saveGameDataRejected
} from './saveFinishedGameDataActions';
import { getFinishedGameData } from '../selectors/FinishedGameStateSelectors';

function* saveFinishedGameData( action: SaveGameDataAction ) {
    const gameData = yield select( getFinishedGameData );

    yield put( saveGameDataPending() );

    // TODO: how can I make this better with environment variables?
    // or if not possible, at least export the function so that it's unit testable
    const host = window.location.host;
    console.log(host)
    let apiUrl;
    if (host.includes( 'localhost' ) || host.includes( 'deploy' )) {
        apiUrl = 'https://ultimatettt-test.azurewebsites.net/api/SaveGameFinishedData';
    } else {
        apiUrl = 'https://ultimatettt.azurewebsites.net/api/SaveGameFinishedData';
    }
    console.log(apiUrl);

    const response = yield fetch( apiUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( gameData )
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