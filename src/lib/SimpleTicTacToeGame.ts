import { Move, TileValue } from '../state/AppState';
import { TicTacToeGame } from './TicTacToeGame';

export class SimpleTicTacToeGame extends TicTacToeGame {
  constructor(state: TileValue[]) {
    super([]);

    const simpleMoves = this.getSimpleMoves(state);
    this.applySimpleMoves(simpleMoves);
  }

  private getSimpleMoves(state: TileValue[]): Move[] {
    if (state.length !== 9) {
      throw new Error('State has to be of length 9!');
    }

    let allMoves: Move[] = [];
    for (let i = 0; i < state.length; i++) {
      if (state[i] === TileValue.Empty) continue;
      for (let j = 0; j < 3; j++) {
        allMoves.push({
          boardPosition: { x: Math.floor(i / 3), y: i % 3 },
          tilePosition: { x: Math.floor(j / 3), y: j % 3 },
        });
      }
    }

    return allMoves;
  }

  private applySimpleMoves(moves: Move[]) {
    moves.forEach((move) => {
      this.applyPartialMove(move);
    });
  }
}
