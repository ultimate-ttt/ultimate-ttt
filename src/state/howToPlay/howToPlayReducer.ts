import { GenericAction, HowToPlay } from '../AppState';
import {
  HOW_TO_PLAY_CLOSE,
  HOW_TO_PLAY_STATE_FORWARD,
  HOW_TO_PLAY_STEP_BACKWARD,
  HOW_TO_PLAY_STEP_FORWARD,
} from './howToPlayActions';
import produce from 'immer';
import { TicTacToeGame } from '../../lib';
import { howToPlaySteps } from './howToPlaySteps';

const initialState: HowToPlay = {
  stepNumber: 0,
  maxStepNumber: howToPlaySteps.length - 1,
  stateNumber: -1,
  boardState: {
    animate: true,
    board: howToPlaySteps[0].states[0].getBoard(),
    currentPlayer: howToPlaySteps[0].states[0].getCurrentPlayer(),
    activeBoards: howToPlaySteps[0].states[0].getCurrentActiveBoards(),
  },
};

const howToPlayReducer = (state = initialState, action: GenericAction) => {
  switch (action.type) {
    case HOW_TO_PLAY_CLOSE:
      return initialState;

    case HOW_TO_PLAY_STEP_FORWARD:
    case HOW_TO_PLAY_STEP_BACKWARD:
      return produce(state, (draftState) => {
        if (action.type === HOW_TO_PLAY_STEP_FORWARD) {
          if (draftState.stepNumber === draftState.maxStepNumber) return;
          draftState.stepNumber++;
        } else {
          if (draftState.stepNumber === 0) return;
          draftState.stepNumber--;
        }

        const newBoard = howToPlaySteps[draftState.stepNumber].states[0];
        draftState.boardState = {
          animate: true,
          board: newBoard.getBoard(),
          currentPlayer: newBoard.getCurrentPlayer(),
          activeBoards: newBoard.getCurrentActiveBoards(),
        };

        draftState.stateNumber = -1;
        if (howToPlaySteps[draftState.stepNumber].states.length > 1) {
          draftState.stateNumber = 0;
          draftState.boardState.animate = false;
        }
      });

    case HOW_TO_PLAY_STATE_FORWARD: {
      const step = howToPlaySteps[state.stepNumber];
      if (step.states.length === 1 && step.moves.length > 0) {
        return produce(state, (draftState) => {
          draftState.stateNumber =
            step.moves.length - 1 > draftState.stateNumber
              ? draftState.stateNumber + 1
              : -1;

          const newBoard = new TicTacToeGame(step.states[0].getMoves());
          const movesToApply = step.moves.slice(0, draftState.stateNumber + 1);
          newBoard.applyMoves(movesToApply);
          draftState.boardState = {
            ...draftState.boardState,
            board: newBoard.getBoard(),
            currentPlayer: newBoard.getCurrentPlayer(),
            activeBoards: newBoard.getCurrentActiveBoards(),
          };
        });
      } else if (step.states.length > 1) {
        return produce(state, (draftState) => {
          draftState.stateNumber =
            step.states.length - 1 > draftState.stateNumber
              ? draftState.stateNumber + 1
              : 0;

          const newBoard = step.states[draftState.stateNumber];
          draftState.boardState = {
            ...draftState.boardState,
            board: newBoard.getBoard(),
            currentPlayer: newBoard.getCurrentPlayer(),
            activeBoards: newBoard.getCurrentActiveBoards(),
          };
        });
      } else {
        return state;
      }
    }

    default:
      return state;
  }
};

export default howToPlayReducer;
