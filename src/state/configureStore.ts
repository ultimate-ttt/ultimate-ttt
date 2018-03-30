import { AppState } from './AppState';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import boardReducer from './board/boardReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import gameReducer from './game/gameReducer';
import moveReducer from './moves/moveReducer';
import { enableBatching } from 'redux-batched-actions';
import activeBoardsReducer from './activeBoards/activeBoardsReducer';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import playerMovedSaga from './sagas/moveValidationSaga';
import boardCalculationSaga from './sagas/boardCalculationSaga';
import activeBoardsCalculationSaga from './sagas/activeBoardsCalculationSaga';
import checkGameFinishedSaga from './sagas/checkGameFinishedSaga';

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
            fork( playerMovedSaga ),
            fork(boardCalculationSaga),
            fork(activeBoardsCalculationSaga),
            fork(checkGameFinishedSaga)
        ]
    );
}