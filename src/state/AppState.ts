import { Point } from '../util';

export interface AppState {
  currentGame: GameInformation;
  finishedGames: FinishedGameState[];
  analysisGame: AnalysisGame;
}

export interface GameInformation {
  board: SmallBoardInformation[];
  game: GameState;
  moves: MoveState[];
  activeBoards: Point[];
}

export interface FinishedGameState {
  id?: string;
  date: string;
  winner: Winner;
  gameState: SmallBoardInformation[];
  moves: MoveState[];
  saveState: string;
  errorMessage: string;
}

export interface AnalysisGame {
  id: string;
  board: SmallBoardInformation[];
  game: GameState;
  moves: MoveState[];
  activeBoards: Point[];
  currentMove: number;
}

export interface GameState {
  currentPlayer: Player;
  isFinished: boolean;
  winningPlayer: Winner;
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
  Destroyed = 3,
}

export enum Winner {
  Cross = 0,
  Circle = 1,
  None = 2,
  Draw = 3,
}

export enum Player {
  Cross = 0,
  Circle = 1,
}

export interface Move {
  boardPosition: Point;
  tilePosition: Point;
}

export interface MoveState extends Move {
  player: Player;
  moveNumber: number;
}

export interface GenericAction {
  type: string;
  // tslint:disable-next-line: no-any
  payload?: any;
}

export interface MarkSpecially {
  condition: boolean;
  position?: { boardPosition: Point; tilePosition: Point };
}
