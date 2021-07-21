import { GenericAction, SmallBoardInformation } from '../../AppState';
import produce from 'immer';
import { SET_BOARD_VALUE, SET_TILE_VALUE } from './boardActions';
import { RESTART_GAME } from '../../commonAction';
import { TicTacToeGame, Point } from '../../../lib';

const getSmallBoard = (
  bigBoard: SmallBoardInformation[],
  boardPosition: Point,
) => {
  const smallBoardIndex = bigBoard.findIndex((board) => {
    return Point.equal(board.position, boardPosition);
  });
  return bigBoard[smallBoardIndex];
};

const initialState = new TicTacToeGame([]).getBoard();

const boardReducer = (state = initialState, action: GenericAction) => {
  switch (action.type) {
    case SET_TILE_VALUE: {
      return produce(state, (draftState) => {
        const smallBoard = getSmallBoard(
          draftState,
          action.payload.boardPosition,
        );
        const tileIndex = smallBoard.tiles.findIndex((tile) => {
          return Point.equal(tile.position, action.payload.tilePosition);
        });
        smallBoard.tiles[tileIndex].value = action.payload.tileValue;
      });
    }
    case SET_BOARD_VALUE: {
      return produce(state, (draftState) => {
        const smallBoard = getSmallBoard(
          draftState,
          action.payload.boardPosition,
        );
        smallBoard.value = action.payload.tileValue;
      });
    }
    case RESTART_GAME: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default boardReducer;
