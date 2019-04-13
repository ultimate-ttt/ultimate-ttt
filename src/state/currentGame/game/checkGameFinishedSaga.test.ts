import { expectSaga } from 'redux-saga-test-plan';
import checkGameFinishedSaga from './checkGameFinishedSaga';
import { getBoards } from '../../selectors/AppStateSelectors';
import { select } from 'redux-saga/effects';
import { CHECK_GAME_FINISHED, GAME_FINISHED } from './gameAction';
import { Player } from '../../AppState';
import { SET_ALLOWED_BOARDS } from '../activeBoards/activeBoardsActions';
import {
  circleFinishedBoardMock,
  crossFinishedBoardMock,
  unfinishedBoardMock,
  circleFinishedGameMock,
  crossFinishedGameMock,
} from '../../../__mocks__';
import { SAVE_GAME_DATA } from '../../finishedGames/saveFinishedGameDataActions';
import { getFinishedGameData } from '../../selectors/FinishedGameStateSelectors';

describe('checkGameFinishedSaga', () => {
  it(
    'should dispatch gameFinished action with Circle and' +
      ' setAllowedBoards to no board when the game is finished',
    () => {
      return expectSaga(checkGameFinishedSaga)
        .provide([
          [select(getBoards), circleFinishedBoardMock],
          [select(getFinishedGameData), circleFinishedGameMock],
        ])
        .put({ type: GAME_FINISHED, payload: Player.Circle })
        .put({ type: SET_ALLOWED_BOARDS, payload: [] })
        .put({ type: SAVE_GAME_DATA, payload: circleFinishedGameMock })
        .dispatch({ type: CHECK_GAME_FINISHED })
        .silentRun();
    },
  );

  it(
    'should dispatch gameFinished action with Cross and setAllowedBoards to no board ' +
      'if the game is finished',
    () => {
      return expectSaga(checkGameFinishedSaga)
        .provide([
          [select(getBoards), crossFinishedBoardMock],
          [select(getFinishedGameData), crossFinishedGameMock],
        ])
        .put({ type: GAME_FINISHED, payload: Player.Cross })
        .put({ type: SET_ALLOWED_BOARDS, payload: [] })
        .put({ type: SAVE_GAME_DATA, payload: crossFinishedGameMock })
        .dispatch({ type: CHECK_GAME_FINISHED })
        .silentRun();
    },
  );

  it('should dispatch no action if the game is not finished', () => {
    return expectSaga(checkGameFinishedSaga)
      .provide([[select(getBoards), unfinishedBoardMock]])
      .dispatch({ type: CHECK_GAME_FINISHED })
      .silentRun();
  });

  // if more put effects happen: this catches it + this checks for the order
  it('should match snapshot', () => {
    return expectSaga(checkGameFinishedSaga)
      .provide([
        [select(getBoards), circleFinishedBoardMock],
        [select(getFinishedGameData), circleFinishedGameMock],
      ])
      .dispatch({ type: CHECK_GAME_FINISHED })
      .silentRun()
      .then((result) => {
        expect(result.toJSON()).toMatchSnapshot();
      });
  });
});
