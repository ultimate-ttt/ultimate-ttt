import { TicTacToeGame } from '../../util';
import { Move } from '../AppState';
import { winStates } from './possibleWinStates';

export interface HowToPlayStep {
  text: string;
  states: TicTacToeGame[];
  moves: Move[];
}

// TODO export all texts in the UI into a json file, in the future
export const steps: HowToPlayStep[] = [
  {
    text: 'Ultimate Tic-Tac-Toe is played with 9 small tic-tac-toe boards',
    states: [new TicTacToeGame([])],
    moves: [],
  },
  {
    text: 'Each turn a player marks a field',
    states: [new TicTacToeGame([])],
    moves: [
      { boardPosition: { x: 0, y: 0 }, tilePosition: { x: 0, y: 0 } },
      { boardPosition: { x: 0, y: 0 }, tilePosition: { x: 0, y: 1 } },
    ],
  },
  {
    text:
      'When you get three in a row on a small board, you’ve won that board.',
    states: [
      new TicTacToeGame([
        { boardPosition: { x: 0, y: 0 }, tilePosition: { x: 1, y: 0 } },
        { boardPosition: { x: 1, y: 0 }, tilePosition: { x: 0, y: 0 } },
        { boardPosition: { x: 0, y: 0 }, tilePosition: { x: 1, y: 1 } },
      ]),
    ],
    moves: [
      { boardPosition: { x: 1, y: 1 }, tilePosition: { x: 0, y: 0 } },
      { boardPosition: { x: 0, y: 0 }, tilePosition: { x: 1, y: 2 } },
    ],
  },
  {
    text: 'To win the game, you need to win three small boards in a row',
    states: winStates,
    moves: [],
  },
  {
    // TODO insert component to show that this is marked by light blue?
    // TODO: animation when going to step is not turned off!?
    text:
      'Each turn the previous move of your opponent dictates in which board you can move next',
    states: [new TicTacToeGame([])],
    moves: [
      { boardPosition: { x: 0, y: 0 }, tilePosition: { x: 0, y: 1 } },
      { boardPosition: { x: 0, y: 1 }, tilePosition: { x: 0, y: 2 } },
      { boardPosition: { x: 0, y: 2 }, tilePosition: { x: 1, y: 0 } },
      { boardPosition: { x: 1, y: 0 }, tilePosition: { x: 1, y: 1 } },
      { boardPosition: { x: 1, y: 1 }, tilePosition: { x: 1, y: 2 } },
      { boardPosition: { x: 1, y: 2 }, tilePosition: { x: 2, y: 0 } },
      { boardPosition: { x: 2, y: 0 }, tilePosition: { x: 2, y: 1 } },
      { boardPosition: { x: 2, y: 1 }, tilePosition: { x: 2, y: 2 } },
      { boardPosition: { x: 2, y: 2 }, tilePosition: { x: 0, y: 0 } },
    ],
  },
  {
    text: `If your opponent sends you to a board that's already won, you can make your move on any of the other boards`,
    states: [
      new TicTacToeGame([
        { boardPosition: { x: 0, y: 0 }, tilePosition: { x: 1, y: 0 } },
        { boardPosition: { x: 1, y: 0 }, tilePosition: { x: 0, y: 0 } },
        { boardPosition: { x: 0, y: 0 }, tilePosition: { x: 1, y: 1 } },
        { boardPosition: { x: 1, y: 1 }, tilePosition: { x: 0, y: 0 } },
        { boardPosition: { x: 0, y: 0 }, tilePosition: { x: 1, y: 2 } },
      ]),
    ],
    moves: [
      { boardPosition: { x: 1, y: 2 }, tilePosition: { x: 2, y: 2 } },
      { boardPosition: { x: 2, y: 2 }, tilePosition: { x: 0, y: 0 } },
      { boardPosition: { x: 2, y: 0 }, tilePosition: { x: 1, y: 2 } },
    ],
  },
  {
    text:
      'If one of the small boards results in a tie, the board counts for neither X nor O.',
    states: [
      new TicTacToeGame([
        { boardPosition: { x: 0, y: 0 }, tilePosition: { x: 2, y: 0 } },
        { boardPosition: { x: 2, y: 0 }, tilePosition: { x: 0, y: 0 } },
        { boardPosition: { x: 0, y: 0 }, tilePosition: { x: 0, y: 2 } },
        { boardPosition: { x: 0, y: 2 }, tilePosition: { x: 1, y: 2 } },
        { boardPosition: { x: 1, y: 2 }, tilePosition: { x: 0, y: 0 } },
        { boardPosition: { x: 0, y: 0 }, tilePosition: { x: 1, y: 1 } },
        { boardPosition: { x: 1, y: 1 }, tilePosition: { x: 0, y: 0 } },
        { boardPosition: { x: 0, y: 0 }, tilePosition: { x: 0, y: 0 } },
        { boardPosition: { x: 0, y: 0 }, tilePosition: { x: 2, y: 2 } },
        { boardPosition: { x: 2, y: 2 }, tilePosition: { x: 2, y: 2 } },
        { boardPosition: { x: 2, y: 2 }, tilePosition: { x: 0, y: 0 } },
        { boardPosition: { x: 0, y: 0 }, tilePosition: { x: 2, y: 1 } },
        { boardPosition: { x: 2, y: 1 }, tilePosition: { x: 2, y: 1 } },
        { boardPosition: { x: 2, y: 1 }, tilePosition: { x: 0, y: 0 } },
        { boardPosition: { x: 0, y: 0 }, tilePosition: { x: 0, y: 1 } },
        { boardPosition: { x: 0, y: 1 }, tilePosition: { x: 0, y: 1 } },
        { boardPosition: { x: 0, y: 1 }, tilePosition: { x: 0, y: 0 } },
        { boardPosition: { x: 0, y: 0 }, tilePosition: { x: 1, y: 2 } },
        { boardPosition: { x: 1, y: 2 }, tilePosition: { x: 1, y: 0 } },
      ]),
    ],
    moves: [
      { boardPosition: { x: 1, y: 0 }, tilePosition: { x: 0, y: 0 } },
      { boardPosition: { x: 0, y: 0 }, tilePosition: { x: 1, y: 0 } },
    ],
  },
];
