import { Player, TileValue } from '../state/AppState';

export const playerToTileValue = ( player: Player, isForFullSmallBoard: boolean = false ) => {
    if (player === Player.Cross) {
        return TileValue.Cross;
    } else if (player === Player.Circle) {
        return TileValue.Circle;
    } else if (isForFullSmallBoard && player === null) {
        return TileValue.Destroyed;
    } else {
        return TileValue.Empty;
    }
};