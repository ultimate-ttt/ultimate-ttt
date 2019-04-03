import { Player, TileValue, Winner } from '../../state/AppState';
import { playerToTileValue } from '../PlayerToTile';

describe('playerToTileValue', () => {
  it('should return an empty tile when Winner is Draw', () => {
    const input = Winner.Draw;
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

  it('should return TileValue Destroyed when Winner is Draw and small board is full', () => {
    const input = Winner.Draw;
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
