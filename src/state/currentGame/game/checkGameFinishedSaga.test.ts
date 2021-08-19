import { expectSaga } from 'redux-saga-test-plan';
import checkGameFinishedSaga from './checkGameFinishedSaga';
import { getMoves } from '../../selectors/appStateSelectors';
import { select } from 'redux-saga/effects';
import { CHECK_GAME_FINISHED, GAME_FINISHED } from './gameAction';
import { Player } from '../../AppState';
import { SET_ACTIVE_BOARDS } from '../activeBoards/activeBoardsActions';
import { getFinishedGame } from '../../selectors/finishedGameStateSelectors';
import {
  circleFinishedGameMock,
  crossFinishedGameMock,
  movesForCircleFinishedBoardMock,
  movesForCrossFinishedBoardMock,
  movesForUnfinishedBoardMock,
} from '../../../mocks/board';
import { SAVE_GAME } from '../../finishedGames/saveFinishedGameActions';
import { getIsOnlineGame } from '../../selectors/onlineStateSelectors';

describe('checkGameFinishedSaga', () => {
  it(
    'should dispatch gameFinished action with Circle and' +
      ' setActiveBoards to no board when the game is finished',
    () => {
      return expectSaga(checkGameFinishedSaga)
        .provide([
          [select(getMoves), movesForCircleFinishedBoardMock],
          [select(getFinishedGame), circleFinishedGameMock],
          [select(getIsOnlineGame), false],
        ])
        .put({ type: GAME_FINISHED, payload: Player.Circle })
        .put({ type: SET_ACTIVE_BOARDS, payload: [] })
        .put({
          type: SAVE_GAME,
          payload: circleFinishedGameMock,
          saveOnline: true,
        })
        .dispatch({ type: CHECK_GAME_FINISHED })
        .silentRun();
    },
  );

  it(
    'should dispatch gameFinished action with Cross and setActiveBoards to no board ' +
      'if the game is finished',
    () => {
      return expectSaga(checkGameFinishedSaga)
        .provide([
          [select(getMoves), movesForCrossFinishedBoardMock],
          [select(getFinishedGame), crossFinishedGameMock],
          [select(getIsOnlineGame), false],
        ])
        .put({ type: GAME_FINISHED, payload: Player.Cross })
        .put({ type: SET_ACTIVE_BOARDS, payload: [] })
        .put({
          type: SAVE_GAME,
          payload: crossFinishedGameMock,
          saveOnline: true,
        })
        .dispatch({ type: CHECK_GAME_FINISHED })
        .silentRun();
    },
  );

  it('should dispatch no action if the game is not finished', () => {
    return expectSaga(checkGameFinishedSaga)
      .provide([[select(getMoves), movesForUnfinishedBoardMock]])
      .dispatch({ type: CHECK_GAME_FINISHED })
      .silentRun();
  });

  // TODO change this test when online mode is productive
  it('should dispatch no action if the game is an online game', () => {
    return expectSaga(checkGameFinishedSaga)
      .provide([
        [select(getMoves), movesForCrossFinishedBoardMock],
        [select(getFinishedGame), crossFinishedGameMock],
        [select(getIsOnlineGame), true],
      ])
      .dispatch({ type: CHECK_GAME_FINISHED })
      .silentRun();
  });
});
