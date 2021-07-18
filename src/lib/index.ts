import { Point as P, arePointsEqual } from './Point';
import { playerToTileValue } from './PlayerToTile';
import { TicTacToeGame } from './TicTacToeGame';
import { SimpleTicTacToeGame } from './SimpleTicTacToeGame';
import { getApiUrl } from './ApiUrl';
import { Keys } from './Keys';
import environment from './environment';

export {
  playerToTileValue,
  arePointsEqual,
  TicTacToeGame,
  SimpleTicTacToeGame,
  getApiUrl,
  Keys,
  environment,
};
// https://github.com/facebook/create-react-app/issues/6054
export type Point = P;
