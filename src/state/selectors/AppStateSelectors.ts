import { AppState } from '../AppState';

export const getBoards = ( state: AppState ) => state.board;

export const getCurrentPlayer = ( state: AppState ) => state.game.currentPlayer;
