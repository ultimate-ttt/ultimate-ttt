import { AppState } from './AppState';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import tileReducer from './tiles/tileReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import gameReducer from './game/gameReducer';
import moveReducer from './moves/moveReducer';
import { enableBatching } from 'redux-batched-actions';
import activeBoardReducer from './activeBoards/activeBoardsReducer';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import moveValidationSaga from './sagas/MoveValidationSaga';

const rootreducer = combineReducers<AppState>(
    {
        game: gameReducer,
        tiles: tileReducer,
        moves: moveReducer,
        activeBoards: activeBoardReducer
    } );

export function configureStore() {

    const sagaMiddleware = createSagaMiddleware();

    const middleWaresToApply = [
        logger,
        sagaMiddleware
    ];
    const middleware = applyMiddleware( ...middleWaresToApply );
    const store = createStore( enableBatching( rootreducer ), composeWithDevTools(
        middleware
    ) );

    sagaMiddleware.run( rootSaga );

    return store;
}

function* rootSaga() {
    yield all(
        [
            fork( moveValidationSaga ),
        ]
    );
}