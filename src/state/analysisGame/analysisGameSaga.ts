import { AnalysisGame, GenericAction, TileValue } from '../AppState';
import { put, select, takeEvery } from 'redux-saga/effects';
import { LOAD_FINISHED_GAME, setAnalysisGame } from './analysisGameActions';
import { getFinishedGame } from '../selectors/AppStateSelectors';

function resetGame( game: AnalysisGame ) {
    game.board.forEach( b => {
        b.value = TileValue.Empty;
        b.tiles.forEach( t => {
            t.value = TileValue.Empty;
        } );
    } );

    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            game.activeBoards.push( {x, y} );
        }
    }

    return game;
}

function* loadFinishedGame( action: GenericAction ) {

    const finishedGame: AnalysisGame | undefined = yield select( getFinishedGame, action.payload );
    // TODO if no results in selector: try over network

    if (finishedGame !== undefined) {
        const game = resetGame( finishedGame! );
        yield put( setAnalysisGame( game ) );
    }
}

function* loadFinishedGameSaga() {
    yield takeEvery( LOAD_FINISHED_GAME, loadFinishedGame );
}

export default loadFinishedGameSaga;