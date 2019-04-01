import { Player, TileValue } from '../../state/AppState';
import { playerToTileValue } from '../PlayerToTile';

describe('playerToTileValue', () => {
  it('should return an empty tile when player is null', () => {
    const input = null;
    const expectedResult = TileValue.Empty;
    const actualResult = playerToTileValue(input);
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return TileValue Cross when player is Cross', () => {
    const input = Player.Cross;
    const expectedResult = TileValue.Cross;
    const actualResult = playerToTileValue(input);
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return TileValue Circle when player is Circle', () => {
    const input = Player.Circle;
    const expectedResult = TileValue.Circle;
    const actualResult = playerToTileValue(input);
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return TileValue Destroyed when player is null and small board is fulll', () => {
    const input = null;
    const expectedResult = TileValue.Destroyed;
    const actualResult = playerToTileValue(input, true);
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return TileValue Cross when player is Cross and small board is full', () => {
    const input = Player.Cross;
    const expectedResult = TileValue.Cross;
    const actualResult = playerToTileValue(input, true);
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return TileValue Circle when player is Circle', () => {
    const input = Player.Circle;
    const expectedResult = TileValue.Circle;
    const actualResult = playerToTileValue(input, true);
    expect(actualResult).toEqual(expectedResult);
  });
});
