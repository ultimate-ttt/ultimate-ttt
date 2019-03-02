import { Point } from '../util/Point';

export interface AppState {
    board: SmallBoardInformation[];
    game: GameState;
    moves: Move[];
    activeBoards: Point[];
    finishedGames: FinishedGameState[];
}

export interface FinishedGameState {
    id?: string;
    winner?: Player | null;
    gameState: SmallBoardInformation[];
    moves: Move[];
    saveState: string;
    errorMessage: string;
}

export interface GameState {
    currentPlayer: Player;
    isFinished: boolean;
    winningPlayer?: Player | null;
}

export interface TileInformation {
    position: Point;
    value: TileValue;
}

export interface SmallBoardInformation extends TileInformation {
    tiles: SmallTileInformation[];
}

export interface SmallTileInformation extends TileInformation {
    boardPosition: Point;
}

export enum TileValue {
    Cross = 0,
    Circle = 1,
    Empty = 2,
    Destroyed = 3
}

export enum Player {
    Cross = 0,
    Circle = 1
}

export interface Move {
    boardPosition: Point;
    tilePosition: Point;
    player: Player;
    moveNumber: number;
}

export interface GenericAction {
    type: string;
    // tslint:disable-next-line: no-any
    payload?: any;
}

export function cloneState<T>( state: T ): T {
    return JSON.parse( JSON.stringify( state ) );
}