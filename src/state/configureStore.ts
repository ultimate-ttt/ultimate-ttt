import { AppState } from './AppState';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import boardReducer from './board/boardReducer';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import gameReducer from './game/gameReducer';
import moveReducer from './moves/moveReducer';
import activeBoardsReducer from './activeBoards/activeBoardsReducer';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import playerMovedSaga from './sagas/moveValidationSaga';
import boardCalculationSaga from './sagas/boardCalculationSaga';
import activeBoardsCalculationSaga from './sagas/activeBoardsCalculationSaga';
import checkGameFinishedSaga from './sagas/checkGameFinishedSaga';
import saveFinishedGameDataSaga from './sagas/saveFinishedGameData';

const rootreducer = combineReducers<AppState>(
    {
        game: gameReducer,
        board: boardReducer,
        moves: moveReducer,
        activeBoards: activeBoardsReducer
    } );

export function configureStore() {

    const sagaMiddleware = createSagaMiddleware();

    const middleWaresToApply = [
        sagaMiddleware
    ];

    if (process.env.NODE_ENV === `development`) {
        const {logger} = require( `redux-logger` );
        middleWaresToApply.push( logger );
    }

    const middleware = applyMiddleware( ...middleWaresToApply );
    const store = createStore( (rootreducer), composeWithDevTools(
        middleware
    ) );

    sagaMiddleware.run( rootSaga );

    return store;
}

function* rootSaga() {
    yield all(
        [
            fork( playerMovedSaga ),
            fork( boardCalculationSaga ),
            fork( activeBoardsCalculationSaga ),
            fork( checkGameFinishedSaga ),
            fork( saveFinishedGameDataSaga )
        ]
    );
}