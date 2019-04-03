import { TileValue, Winner, Player } from '../state/AppState';

export const playerToTileValue = (
  player: Winner | Player,
  isForFullSmallBoard: boolean = false,
) => {
  if (player === Winner.Cross) {
    return TileValue.Cross;
  } else if (player === Winner.Circle) {
    return TileValue.Circle;
  } else if (isForFullSmallBoard && player === Winner.Draw) {
    return TileValue.Destroyed;
  } else {
    return TileValue.Empty;
  }
};
