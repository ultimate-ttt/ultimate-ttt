import { getWinResult } from '../CheckBoard';
import { Player, TileValue } from '../../state/AppState';

const getTile = (boardX: number, boardY: number, value: TileValue) => {
  return {
    position: { x: boardX, y: boardY },
    value: value,
  };
};

describe('getWinResult', () => {
  it('should indicate that game is not finished', () => {
    const board = [
      getTile(0, 0, TileValue.Cross),
      getTile(1, 0, TileValue.Circle),
      getTile(2, 0, TileValue.Empty),

      getTile(0, 1, TileValue.Empty),
      getTile(1, 1, TileValue.Cross),
      getTile(2, 1, TileValue.Cross),

      getTile(0, 2, TileValue.Circle),
      getTile(1, 2, TileValue.Circle),
      getTile(2, 2, TileValue.Empty),
    ];

    const result = getWinResult(board);
    expect(result.isFinished).toEqual(false);
    expect(result.winningPlayer).toEqual(null);
  });

  it('should indicate that game is finished but no one won', () => {
    const board = [
      getTile(0, 0, TileValue.Cross),
      getTile(1, 0, TileValue.Circle),
      getTile(2, 0, TileValue.Circle),

      getTile(0, 1, TileValue.Circle),
      getTile(1, 1, TileValue.Cross),
      getTile(2, 1, TileValue.Cross),

      getTile(0, 2, TileValue.Cross),
      getTile(1, 2, TileValue.Cross),
      getTile(2, 2, TileValue.Circle),
    ];

    const result = getWinResult(board);
    expect(result.isFinished).toEqual(true);
    expect(result.winningPlayer).toEqual(null);
  });

  it('should indicate winning result for Cross because of row0', () => {
    const board = [
      getTile(0, 0, TileValue.Cross),
      getTile(1, 0, TileValue.Cross),
      getTile(2, 0, TileValue.Cross),

      getTile(0, 1, TileValue.Circle),
      getTile(1, 1, TileValue.Circle),
      getTile(2, 1, TileValue.Empty),

      getTile(0, 2, TileValue.Cross),
      getTile(1, 2, TileValue.Circle),
      getTile(2, 2, TileValue.Empty),
    ];

    const result = getWinResult(board);
    expect(result.isFinished).toEqual(true);
    expect(result.winningPlayer).toEqual(Player.Cross);
  });

  it('should indicate winning result for Circle because of row0', () => {
    const board = [
      getTile(0, 0, TileValue.Circle),
      getTile(1, 0, TileValue.Circle),
      getTile(2, 0, TileValue.Circle),

      getTile(0, 1, TileValue.Empty),
      getTile(1, 1, TileValue.Cross),
      getTile(2, 1, TileValue.Circle),

      getTile(0, 2, TileValue.Cross),
      getTile(1, 2, TileValue.Cross),
      getTile(2, 2, TileValue.Empty),
    ];

    const result = getWinResult(board);
    expect(result.isFinished).toEqual(true);
    expect(result.winningPlayer).toEqual(Player.Circle);
  });

  it('should indicate winning result for Cross because of row1', () => {
    const board = [
      getTile(0, 0, TileValue.Cross),
      getTile(1, 0, TileValue.Circle),
      getTile(2, 0, TileValue.Empty),

      getTile(0, 1, TileValue.Cross),
      getTile(1, 1, TileValue.Cross),
      getTile(2, 1, TileValue.Cross),

      getTile(0, 2, TileValue.Empty),
      getTile(1, 2, TileValue.Circle),
      getTile(2, 2, TileValue.Circle),
    ];

    const result = getWinResult(board);
    expect(result.isFinished).toEqual(true);
    expect(result.winningPlayer).toEqual(Player.Cross);
  });

  it('should indicate winning result for Cross because of row2', () => {
    const board = [
      getTile(0, 0, TileValue.Circle),
      getTile(1, 0, TileValue.Empty),
      getTile(2, 0, TileValue.Circle),

      getTile(0, 1, TileValue.Empty),
      getTile(1, 1, TileValue.Circle),
      getTile(2, 1, TileValue.Cross),

      getTile(0, 2, TileValue.Cross),
      getTile(1, 2, TileValue.Cross),
      getTile(2, 2, TileValue.Cross),
    ];

    const result = getWinResult(board);
    expect(result.isFinished).toEqual(true);
    expect(result.winningPlayer).toEqual(Player.Cross);
  });

  it('should indicate winning result for Circle because of column0', () => {
    const board = [
      getTile(0, 0, TileValue.Circle),
      getTile(1, 0, TileValue.Circle),
      getTile(2, 0, TileValue.Cross),

      getTile(0, 1, TileValue.Circle),
      getTile(1, 1, TileValue.Cross),
      getTile(2, 1, TileValue.Cross),

      getTile(0, 2, TileValue.Circle),
      getTile(1, 2, TileValue.Empty),
      getTile(2, 2, TileValue.Empty),
    ];

    const result = getWinResult(board);
    expect(result.isFinished).toEqual(true);
    expect(result.winningPlayer).toEqual(Player.Circle);
  });

  it('should indicate winning result for Circle because of column1', () => {
    const board = [
      getTile(0, 0, TileValue.Empty),
      getTile(1, 0, TileValue.Circle),
      getTile(2, 0, TileValue.Cross),

      getTile(0, 1, TileValue.Empty),
      getTile(1, 1, TileValue.Circle),
      getTile(2, 1, TileValue.Cross),

      getTile(0, 2, TileValue.Cross),
      getTile(1, 2, TileValue.Circle),
      getTile(2, 2, TileValue.Circle),
    ];

    const result = getWinResult(board);
    expect(result.isFinished).toEqual(true);
    expect(result.winningPlayer).toEqual(Player.Circle);
  });

  it('should indicate winning result for Cross because of column2', () => {
    const board = [
      getTile(0, 0, TileValue.Empty),
      getTile(1, 0, TileValue.Circle),
      getTile(2, 0, TileValue.Cross),

      getTile(0, 1, TileValue.Circle),
      getTile(1, 1, TileValue.Cross),
      getTile(2, 1, TileValue.Cross),

      getTile(0, 2, TileValue.Empty),
      getTile(1, 2, TileValue.Circle),
      getTile(2, 2, TileValue.Cross),
    ];

    const result = getWinResult(board);
    expect(result.isFinished).toEqual(true);
    expect(result.winningPlayer).toEqual(Player.Cross);
  });

  it('should indicate winning result for Circle because of left slant', () => {
    const board = [
      getTile(0, 0, TileValue.Circle),
      getTile(1, 0, TileValue.Cross),
      getTile(2, 0, TileValue.Empty),

      getTile(0, 1, TileValue.Cross),
      getTile(1, 1, TileValue.Circle),
      getTile(2, 1, TileValue.Empty),

      getTile(0, 2, TileValue.Circle),
      getTile(1, 2, TileValue.Cross),
      getTile(2, 2, TileValue.Circle),
    ];

    const result = getWinResult(board);
    expect(result.isFinished).toEqual(true);
    expect(result.winningPlayer).toEqual(Player.Circle);
  });

  it('should indicate winning result for Circle because of right slant', () => {
    const board = [
      getTile(0, 0, TileValue.Empty),
      getTile(1, 0, TileValue.Cross),
      getTile(2, 0, TileValue.Circle),

      getTile(0, 1, TileValue.Circle),
      getTile(1, 1, TileValue.Circle),
      getTile(2, 1, TileValue.Cross),

      getTile(0, 2, TileValue.Circle),
      getTile(1, 2, TileValue.Cross),
      getTile(2, 2, TileValue.Cross),
    ];

    const result = getWinResult(board);
    expect(result.isFinished).toEqual(true);
    expect(result.winningPlayer).toEqual(Player.Circle);
  });

  it('should indicate winning result for Circle because of column0, includes destroyed field', () => {
    const input = [
      getTile(0, 0, TileValue.Circle),
      getTile(0, 1, TileValue.Circle),
      getTile(0, 2, TileValue.Circle),

      getTile(1, 0, TileValue.Cross),
      getTile(1, 1, TileValue.Destroyed),
      getTile(1, 2, TileValue.Cross),

      getTile(2, 0, TileValue.Destroyed),
      getTile(2, 1, TileValue.Empty),
      getTile(2, 2, TileValue.Empty),
    ];

    const result = getWinResult(input);
    expect(result.isFinished).toEqual(true);
    expect(result.winningPlayer).toEqual(Player.Circle);
  });

  it('should indicate winning result for Cross because of row0, includes destroyed field', () => {
    const input = [
      getTile(0, 0, TileValue.Cross),
      getTile(0, 1, TileValue.Destroyed),
      getTile(0, 2, TileValue.Destroyed),

      getTile(1, 0, TileValue.Cross),
      getTile(1, 1, TileValue.Empty),
      getTile(1, 2, TileValue.Empty),

      getTile(2, 0, TileValue.Cross),
      getTile(2, 1, TileValue.Circle),
      getTile(2, 2, TileValue.Circle),
    ];

    const result = getWinResult(input);
    expect(result.isFinished).toEqual(true);
    expect(result.winningPlayer).toEqual(Player.Cross);
  });

  it('should indicate winning result for NO ONE, not finished, includes destroyed field', () => {
    const input = [
      getTile(0, 0, TileValue.Empty),
      getTile(0, 1, TileValue.Cross),
      getTile(0, 2, TileValue.Empty),

      getTile(1, 0, TileValue.Destroyed),
      getTile(1, 1, TileValue.Circle),
      getTile(1, 2, TileValue.Destroyed),

      getTile(2, 0, TileValue.Cross),
      getTile(2, 1, TileValue.Circle),
      getTile(2, 2, TileValue.Empty),
    ];

    const result = getWinResult(input);
    expect(result.isFinished).toEqual(false);
    expect(result.winningPlayer).toEqual(null);
  });

  it('should indicate winning result for NO ONE but finished, includes destroyed field', () => {
    const input = [
      getTile(0, 0, TileValue.Destroyed),
      getTile(0, 1, TileValue.Circle),
      getTile(0, 2, TileValue.Circle),

      getTile(1, 0, TileValue.Circle),
      getTile(1, 1, TileValue.Cross),
      getTile(1, 2, TileValue.Cross),

      getTile(2, 0, TileValue.Cross),
      getTile(2, 1, TileValue.Destroyed),
      getTile(2, 2, TileValue.Destroyed),
    ];

    const result = getWinResult(input);
    expect(result.isFinished).toEqual(true);
    expect(result.winningPlayer).toEqual(null);
  });
});
