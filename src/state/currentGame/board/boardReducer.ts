import { GenericAction, SmallBoardInformation } from '../../AppState';
import produce from 'immer';
import { SET_BOARD_VALUE, SET_TILE_VALUE } from './boardActions';
import { RESTART_GAME } from '../../commonAction';
import { TicTacToeGame, Point, arePointsEqual } from '../../../util';

const getSmallBoard = (
  bigBoard: SmallBoardInformation[],
  boardPosition: Point,
) => {
  const smallBoardIndex = bigBoard.findIndex((board) => {
    return arePointsEqual(board.position, boardPosition);
  });
  return bigBoard[smallBoardIndex];
};

const initialState = new TicTacToeGame([]).getBoard();

const boardReducer = (state = initialState, action: GenericAction) => {
  switch (action.type) {
    case SET_TILE_VALUE: {
      const newBoardState = produce(state, (draftState) => {
        const smallBoard = getSmallBoard(
          draftState,
          action.payload.boardPosition,
        );
        const tileIndex = smallBoard.tiles.findIndex((tile) => {
          return arePointsEqual(tile.position, action.payload.tilePosition);
        });
        smallBoard.tiles[tileIndex].value = action.payload.tileValue;
      });

      return newBoardState;
    }
    case SET_BOARD_VALUE: {
      const newBoardState = produce(state, (draftState) => {
        const smallBoard = getSmallBoard(
          draftState,
          action.payload.boardPosition,
        );
        smallBoard.value = action.payload.tileValue;
      });

      return newBoardState;
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
