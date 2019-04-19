import { Point, arePointsEqual } from './Point';
import { playerToTileValue } from './PlayerToTile';
import { TicTacToeGame } from './TicTacToeGame';
import { getApiUrl } from './ApiUrl';

export { playerToTileValue, arePointsEqual, TicTacToeGame, getApiUrl };
// https://github.com/facebook/create-react-app/issues/6054
export type Point = Point;
