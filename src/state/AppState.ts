import { Point } from '../lib';

export interface AppState {
  currentGame: GameInformation;
  finishedGames: FinishedGameState[];
  analysisGame: AnalysisGame;
  howToPlay: HowToPlay;
}

export interface GameInformation {
  board: SmallBoardInformation[];
  game: GameState;
  moves: MoveState[];
  activeBoards: Point[];
  online: OnlineState;
}

export interface FinishedGameState {
  id?: string;
  date: string;
  winner: WinnerString;
  gameState: SmallBoardInformation[];
  moves: MoveState[];
  saveState: SaveState;
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

export interface HowToPlay {
  stepNumber: number;
  maxStepNumber: number;
  stateNumber: number;
  boardState: HowToPlayBoardState;
}

export interface HowToPlayBoardState {
  animate: boolean;
  board: SmallBoardInformation[];
  currentPlayer: Player;
  activeBoards: Point[];
}

export interface GameState {
  currentPlayer: Player;
  isFinished: boolean;
  winningPlayer: Winner;
}

export interface OnlineState {
  gameId?: string;
  playerId?: string;
  player: Player;
  connectGame: {
    saveState: SaveState;
    errorMessage: string;
  };
  lastMove: {
    saveState: SaveState;
    errorMessage: string;
  };
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

export type SaveState = '' | 'pending' | 'fulfilled' | 'rejected';
export type WinnerString = 'X' | 'O' | null;

export interface Move {
  boardPosition: Point;
  tilePosition: Point;
}

export interface MoveState extends Move {
  player: Player;
  moveNumber: number;
}

export interface Highlight {
  condition: boolean;
  position?: { boardPosition: Point; tilePosition: Point };
}

export interface GenericAction {
  type: string;
  payload?: any;
}

export interface TypeOnlyAction {
  type: string;
}

export interface StringAction {
  type: string;
  payload: string;
}
