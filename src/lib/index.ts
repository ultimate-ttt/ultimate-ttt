import { playerToTileValue } from './PlayerToTile';
import { TicTacToeGame } from './TicTacToeGame';
import { SimpleTicTacToeGame } from './SimpleTicTacToeGame';
import { getApiUrl } from './ApiUrl';
import { Keys } from './Keys';
import environment from './environment';
import { Await as A } from './Await';
import { Point as P, arePointsEqual, pointFromXY } from './Point';

export {
  playerToTileValue,
  arePointsEqual,
  pointFromXY,
  TicTacToeGame,
  SimpleTicTacToeGame,
  getApiUrl,
  Keys,
  environment,
};
// https://github.com/facebook/create-react-app/issues/6054
export type Point = P;
export type Await<T> = A<T>;
