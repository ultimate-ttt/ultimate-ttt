import { Point } from '../util/Point';

export interface AppState {
    board: SmallBoardInformation[];
    game: GameState;
    moves: Move[];
    activeBoards: Point[];
}

export interface GameState {
    currentPlayer: Player;
    isFinished: boolean;
    winningPlayer?: Player | undefined;
}

export interface SmallBoardInformation {
    point: Point;
    tiles: TileInformation[];
    value: TileValue;
}

// TODO rename according to clean code: no data type in name. What name to choose then?
export interface TileInformation {
    bigBoardPoint: Point;
    smallBoardPoint: Point;
    value: TileValue;
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
    bigBoardPoint: Point;
    smallBoardPoint: Point;
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