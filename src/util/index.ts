import { Point as P, arePointsEqual } from './Point';
import { playerToTileValue } from './PlayerToTile';
import { TicTacToeGame } from './TicTacToeGame';
import { SimpleTicTacToeGame } from './SimpleTicTacToeGame';
import { getApiUrl } from './ApiUrl';

export {
  playerToTileValue,
  arePointsEqual,
  TicTacToeGame,
  SimpleTicTacToeGame,
  getApiUrl,
};
// https://github.com/facebook/create-react-app/issues/6054
export type Point = P;
