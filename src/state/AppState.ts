import { Point } from '../util/Point';

export interface AppState {
    tiles: Tile[];
    game: {currentPlayer: Player};
    moves: Move[];
}

export interface Tile {
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