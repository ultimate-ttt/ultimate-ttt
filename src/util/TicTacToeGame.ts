import {
  Move,
  Player,
  SmallBoardInformation,
  SmallTileInformation,
  TileInformation,
  TileValue,
  Winner,
} from '../state/AppState';
import { Point, arePointsEqual } from './Point';
import { playerToTileValue } from './PlayerToTile';

export interface WinResult {
  isFinished: boolean;
  winningPlayer: Winner;
}

export class TicTacToeGame {
  private board: SmallBoardInformation[];
  private moves: Move[];
  private currentPlayer: Player;

  constructor(moves: Move[]) {
    this.board = this.getInitialSmallBoards();
    this.currentPlayer = Player.Cross;
    this.moves = [];

    this.applyMoves(moves);
  }

  applyMove(move: Move) {
    const boardToChange = this.board.find((board) =>
      arePointsEqual(board.position, move.boardPosition),
    );
    const tileToChange = boardToChange!.tiles.find((tile) =>
      arePointsEqual(tile.position, move.tilePosition),
    );
    tileToChange!.value = playerToTileValue(this.currentPlayer);

    const winResult = this.getWinResultForGivenBoard(boardToChange!.tiles);
    if (winResult.isFinished) {
      boardToChange!.value = playerToTileValue(winResult.winningPlayer, true);
    }

    this.moves.push(move);
    this.changePlayer();
  }

  applyMoves(moves: Move[]) {
    moves.forEach((move) => {
      this.applyMove(move);
    });
  }

  getWinResult() {
    return this.getWinResultForGivenBoard(this.board);
  }

  getWinResultForSmallBoard(boardPosition: Point) {
    const affectedBoard = this.board.find((board) =>
      arePointsEqual(board.position, boardPosition),
    );
    return this.getWinResultForGivenBoard(affectedBoard!.tiles);
  }

  getCurrentActiveBoards() {
    if (this.getWinResult().isFinished) {
      return [];
    }

    const lastMove = this.moves[this.moves.length - 1].tilePosition;
    let activeBoards = [lastMove];
    const boardLastMovePointsTo = this.board.find(
      (board: SmallBoardInformation) =>
        arePointsEqual(board.position, lastMove),
    );
    const boardIsFinished = boardLastMovePointsTo!.value !== TileValue.Empty;
    if (boardIsFinished) {
      const allUnfinishedBoards = this.board.filter(
        (board: SmallBoardInformation) => board.value === TileValue.Empty,
      );
      activeBoards = allUnfinishedBoards.map(
        (board: SmallBoardInformation) => board.position,
      );
    }

    return activeBoards;
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  getMoves() {
    return this.moves;
  }

  getBoard() {
    return this.board;
  }

  private getInitialSmallBoards() {
    const getInitialTilesOfSmallBoard = (boardPosition: Point) => {
      let tiles: SmallTileInformation[] = [];
      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          tiles.push({
            boardPosition: boardPosition,
            position: { x, y },
            value: TileValue.Empty,
          });
        }
      }
      return tiles;
    };

    let smallBoards: SmallBoardInformation[] = [];
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        smallBoards.push({
          value: TileValue.Empty,
          position: { x, y },
          tiles: getInitialTilesOfSmallBoard({ x, y }),
        });
      }
    }
    return smallBoards;
  }

  private changePlayer() {
    if (this.currentPlayer === Player.Circle) {
      this.currentPlayer = Player.Cross;
    } else {
      this.currentPlayer = Player.Circle;
    }
  }

  private getWinResultForGivenBoard(board: TileInformation[]) {
    const countInLine = (player: Player, row: TileInformation[]) => {
      return row.filter((el) => el.value === playerToTileValue(player)).length;
    };

    const hasWonLine = (player: Player, row: TileInformation[]) => {
      return countInLine(player, row) === 3;
    };

    const getWinResultForPlayer = (player: Player) => {
      return [
        {
          line: 'row0',
          won: hasWonLine(player, board.filter((el) => el.position.y === 0)),
        },
        {
          line: 'row1',
          won: hasWonLine(player, board.filter((el) => el.position.y === 1)),
        },
        {
          line: 'row2',
          won: hasWonLine(player, board.filter((el) => el.position.y === 2)),
        },
        {
          line: 'column0',
          won: hasWonLine(player, board.filter((el) => el.position.x === 0)),
        },
        {
          line: 'column1',
          won: hasWonLine(player, board.filter((el) => el.position.x === 1)),
        },
        {
          line: 'column2',
          won: hasWonLine(player, board.filter((el) => el.position.x === 2)),
        },
        {
          line: 'leftSlant',
          won: hasWonLine(
            player,
            board.filter((el) => el.position.x === el.position.y),
          ),
        },
        {
          line: 'rightSlant',
          won: hasWonLine(
            player,
            board.filter((el) => el.position.x + el.position.y === 2),
          ),
        },
      ].reduce(
        (answer, nextCheck) => {
          return nextCheck.won ? nextCheck : answer;
        },
        { won: false },
      ).won;
    };

    const hasCrossWon = getWinResultForPlayer(Player.Cross);
    const hasCircleWon = getWinResultForPlayer(Player.Circle);
    const boardIsFull = board.every((element) => {
      return element.value !== TileValue.Empty;
    });

    if (hasCrossWon) {
      return {
        isFinished: true,
        winningPlayer: Winner.Cross,
      };
    } else if (hasCircleWon) {
      return {
        isFinished: true,
        winningPlayer: Winner.Circle,
      };
    } else if (boardIsFull) {
      return {
        isFinished: true,
        winningPlayer: Winner.Draw,
      };
    } else {
      return {
        isFinished: false,
        winningPlayer: Winner.None,
      };
    }
  }
}
