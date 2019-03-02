import { AppState } from './AppState';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import boardReducer from './board/boardReducer';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import gameReducer from './game/gameReducer';
import moveReducer from './moves/moveReducer';
import activeBoardsReducer from './activeBoards/activeBoardsReducer';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import playerMovedSaga from './moves/moveValidationSaga';
import boardCalculationSaga from './board/boardCalculationSaga';
import activeBoardsCalculationSaga from './activeBoards/activeBoardsCalculationSaga';
import checkGameFinishedSaga from './game/checkGameFinishedSaga';
import saveFinishedGameDataSaga from './finishedGames/saveFinishedGameDataSaga';
import finishedGameReducer from './finishedGames/finishedGameReducer';

const rootreducer = combineReducers<AppState>(
    {
        game: gameReducer,
        board: boardReducer,
        moves: moveReducer,
        activeBoards: activeBoardsReducer,
        finishedGames: finishedGameReducer
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

    const persistConfig = {
        key: 'finishedGames',
        whitelist: ['finishedGames'],
        storage
    };

    const persistedReducer = persistReducer( persistConfig, rootreducer );
    const store = createStore( (persistedReducer), composeWithDevTools(
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