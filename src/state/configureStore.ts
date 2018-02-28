import { AppState } from './AppState';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import tileReducer from './tiles/tileReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import gameReducer from './game/gameReducer';
import moveReducer from './moves/moveReducer';
import { enableBatching } from 'redux-batched-actions';
import activeBoardReducer from './activeBoards/activeBoardsReducer';

const rootreducer = combineReducers<AppState>(
    {
        game: gameReducer,
        tiles: tileReducer,
        moves: moveReducer,
        activeBoards: activeBoardReducer
    } );

export function configureStore() {

    const middleware = applyMiddleware( logger );
    const store = createStore( enableBatching( rootreducer ), composeWithDevTools(
        middleware
    ) );

    return store;
}