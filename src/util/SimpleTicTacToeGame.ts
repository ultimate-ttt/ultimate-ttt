import { Move, TileValue } from '../state/AppState';
import { TicTacToeGame } from './TicTacToeGame';
import { arePointsEqual } from './Point';
import { playerToTileValue } from './PlayerToTile';

interface MoveExtended extends Move {
  value: TileValue;
}

export class SimpleTicTacToeGame extends TicTacToeGame {
  constructor(state: TileValue[]) {
    super([]);

    const simpleMoves = this.getSimpleMoves(state);
    this.applySimpleMoves(simpleMoves);
  }

  private getSimpleMoves(state: TileValue[]): MoveExtended[] {
    if (state.length !== 9) {
      throw new Error('State has to be of length 9!');
    }

    let allMoves: MoveExtended[] = [];
    for (let i = 0; i < state.length; i++) {
      for (let j = 0; j < 3; j++) {
        allMoves.push({
          boardPosition: { x: Math.floor(i / 3), y: i % 3 },
          tilePosition: { x: Math.floor(j / 3), y: j % 3 },
          value: state[i],
        });
      }
    }

    return allMoves;
  }

  private applySimpleMoves(moves: MoveExtended[]) {
    moves.forEach((move) => {
      this.applySimpleMove(move);
    });
  }

  private applySimpleMove(move: MoveExtended) {
    const boardToChange = this.board.find((board) =>
      arePointsEqual(board.position, move.boardPosition),
    );

    if (!boardToChange) {
      throw new Error('The Board with the given Position was not found');
    }

    const tileToChange = boardToChange.tiles.find((tile) =>
      arePointsEqual(tile.position, move.tilePosition),
    );

    if (!tileToChange) {
      throw new Error('The Tile with the given Position was not found');
    }

    tileToChange.value = move.value;

    const winResult = this.getWinResultForGivenBoard(boardToChange.tiles);
    if (winResult.isFinished) {
      boardToChange.value = playerToTileValue(winResult.winningPlayer, true);
    }

    this.moves.push(move);
  }
}
