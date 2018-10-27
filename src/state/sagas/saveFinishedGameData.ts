import { put, takeEvery } from 'redux-saga/effects';
import {
    SAVE_GAME_DATA,
    SaveGameDataAction,
    saveGameDataFulfilled,
    saveGameDataPending,
    saveGameDataRejected
} from './saveFinishedGameDataActions';

function* saveFinishedGameData( action: SaveGameDataAction ) {
    yield put( saveGameDataPending() );
    // TODO: how can I make this better with environment variables?
    const host = window.location.host;
    let apiUrl;
    if (host.includes( 'localhost' ) || host.includes( 'deploy' )) {
        apiUrl = 'https://ultimatettt-test.azurewebsites.net/api/SaveGameFinishedData';
    } else {
        apiUrl = 'https://ultimatettt.azurewebsites.net/api/SaveGameFinishedData';
    }

    try {
        const response = yield fetch( apiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( action.gameData )
        } );

        if (!response.ok) {
            yield put( saveGameDataRejected( `${response.status}: ${response.statusText}` ) );
        } else {
            yield put( saveGameDataFulfilled() );
        }

    } catch (error) {
        yield put( saveGameDataRejected( error.message ) );
    }
}

function* saveFinishedGameDataSaga() {
    yield takeEvery( SAVE_GAME_DATA, saveFinishedGameData );
}

export default saveFinishedGameDataSaga;