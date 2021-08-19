import { expectSaga } from 'redux-saga-test-plan';
import playerMovedSaga from './moveValidationSaga';
import { getCurrentPlayer } from '../../selectors/appStateSelectors';
import { Player } from '../../AppState';
import {
  CHANGE_PLAYER,
  CHECK_GAME_FINISHED,
  playerMoved,
} from '../game/gameAction';
import { select } from 'redux-saga/effects';
import { REGISTER_MOVE } from './moveAction';
import { CALCULATE_BOARD_VALUE, SET_TILE_VALUE } from '../board/boardActions';
import { CALCULATE_ACTIVE_BOARDS } from '../activeBoards/activeBoardsActions';
import { Point } from '../../../lib';

describe('moveValidationSaga', () => {
  it('should dispatch at least the following actions', () => {
    return expectSaga(playerMovedSaga)
      .provide([[select(getCurrentPlayer), Player.Cross]])
      .put({
        type: REGISTER_MOVE,
        payload: {
          boardPosition: { x: 1, y: 1 },
          tilePosition: { x: 2, y: 2 },
          player: Player.Cross,
        },
      })
      .put({
        type: SET_TILE_VALUE,
        payload: {
          boardPosition: { x: 1, y: 1 },
          tilePosition: { x: 2, y: 2 },
          tileValue: Player.Cross,
        },
      })
      .put({ type: CHANGE_PLAYER })
      .put({ type: CALCULATE_BOARD_VALUE, payload: { x: 1, y: 1 } })
      .put({ type: CALCULATE_ACTIVE_BOARDS })
      .put({ type: CHECK_GAME_FINISHED })
      .dispatch(playerMoved(Point.fromXY(1, 1), Point.fromXY(2, 2)))
      .silentRun();
  });
});
