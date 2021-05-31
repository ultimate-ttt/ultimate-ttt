import { GenericAction, HowToPlay } from '../AppState';
import {
  HOW_TO_PLAY_CLOSE,
  HOW_TO_PLAY_OPEN,
  HOW_TO_PLAY_STATE_FORWARD,
  HOW_TO_PLAY_STEP_BACKWARD,
  HOW_TO_PLAY_STEP_FORWARD,
} from './howToPlayActions';
import produce from 'immer';
import { steps } from './howToPlaySteps';
import { TicTacToeGame } from '../../util';

const initialState: HowToPlay = {
  open: false,
  stepNumber: 0,
  maxStepNumber: steps.length - 1,
  stateNumber: -1,
  text: steps[0].text,
  // TODO: put the next 3 things into one object?
  board: steps[0].states[0].getBoard(),
  currentPlayer: steps[0].states[0].getCurrentPlayer(),
  activeBoards: steps[0].states[0].getCurrentActiveBoards(),
};

const howToPlayReducer = (state = initialState, action: GenericAction) => {
  switch (action.type) {
    case HOW_TO_PLAY_OPEN:
      return produce(state, (draftState) => {
        draftState.open = true;
      });

    case HOW_TO_PLAY_CLOSE:
      return produce(state, (draftState) => {
        draftState.open = false;
      });

    case HOW_TO_PLAY_STEP_FORWARD:
      return produce(state, (draftState) => {
        if (draftState.stepNumber === draftState.maxStepNumber) return;

        draftState.stepNumber++;
        draftState.stateNumber = -1;
        draftState.text = steps[draftState.stepNumber].text;

        const newState = steps[draftState.stepNumber].states[0];
        draftState.board = newState.getBoard();
        draftState.currentPlayer = newState.getCurrentPlayer();
        draftState.activeBoards = newState.getCurrentActiveBoards();
      });

    case HOW_TO_PLAY_STEP_BACKWARD:
      return produce(state, (draftState) => {
        if (draftState.stepNumber === 0) return;

        draftState.stepNumber--;
        draftState.stateNumber = -1;
        draftState.text = steps[draftState.stepNumber].text;

        const newState = steps[draftState.stepNumber].states[0];
        draftState.board = newState.getBoard();
        draftState.currentPlayer = newState.getCurrentPlayer();
        draftState.activeBoards = newState.getCurrentActiveBoards();
      });

    case HOW_TO_PLAY_STATE_FORWARD:
      return produce(state, (draftState) => {
        const step = steps[draftState.stepNumber];
        if (step.states.length === 1) {
          draftState.stateNumber =
            step.moves.length - 1 > draftState.stateNumber
              ? draftState.stateNumber + 1
              : -1;

          const newBoard = new TicTacToeGame(step.states[0].getMoves());
          const movesToApply = step.moves.slice(0, draftState.stateNumber + 1);
          newBoard.applyMoves(movesToApply);
          draftState.board = newBoard.getBoard();
          draftState.currentPlayer = newBoard.getCurrentPlayer();
          draftState.activeBoards = newBoard.getCurrentActiveBoards();
        }
      });

    default:
      return state;
  }
};

export default howToPlayReducer;
