import { AnalysisGame, GenericAction, Player, Winner } from '../AppState';
import {
  MOVE_BACKWARD_IN_HISTORY,
  MOVE_FORWARD_IN_HISTORY,
  RESET_ANALYSIS_GAME,
  SET_ANALYSIS_GAME,
} from './analysisGameActions';
import produce from 'immer';
import { TicTacToeGame } from '../../util';

const initialState: AnalysisGame = {
  id: '',
  board: [],
  activeBoards: [],
  game: {
    isFinished: true,
    winningPlayer: Winner.None,
    currentPlayer: Player.Cross,
  },
  moves: [],
  currentMove: 1,
};

const analysisGameReducer = (state = initialState, action: GenericAction) => {
  switch (action.type) {
    case RESET_ANALYSIS_GAME:
      return initialState;
    case SET_ANALYSIS_GAME:
      return action.payload;

    case MOVE_FORWARD_IN_HISTORY:
    case MOVE_BACKWARD_IN_HISTORY: {
      let lastMoveToApply = 0;
      if (action.type === MOVE_FORWARD_IN_HISTORY) {
        const movesToMoveForward = action.payload;
        lastMoveToApply = state.currentMove + movesToMoveForward;
      }

      if (action.type === MOVE_BACKWARD_IN_HISTORY) {
        const movesToMoveBackward = action.payload;
        lastMoveToApply = state.currentMove - movesToMoveBackward;
      }

      return produce(state, (draftState) => {
        draftState.currentMove = lastMoveToApply;
        const relevantMoves = state.moves.slice(0, lastMoveToApply);

        const game = new TicTacToeGame(relevantMoves);
        draftState.board = game.getBoard();
        draftState.activeBoards = game.getCurrentActiveBoards();
        draftState.game.currentPlayer = game.getCurrentPlayer();
      });
    }

    default:
      return state;
  }
};

export default analysisGameReducer;
