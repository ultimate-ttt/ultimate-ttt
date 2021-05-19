import { TicTacToeGame } from '../../util';
import { Move } from '../../state/AppState';
import { winStates } from './PossibleWinStates';

export interface HowToPlayStep {
  text: string;
  states: TicTacToeGame[];
  moves: Move[];
}

// TODO export all texts in the UI into a json file?
export const steps: HowToPlayStep[] = [
  // TODO initial animation is happening on this step!
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
    text: 'Three signs in a row result in a won small board',
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
    text: 'To win the game you need to win three boards in a row',
    states: winStates,
    moves: [],
  },
  {
    // TODO insert component to show that this is marked by light blue?
    // TODO: animation when going to step is not turned off!
    text:
      'Each turn the move of your opponent dictates in which board you can move next',
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
  // TODO add clarification for board full
  // TODO add board destroy example
];
