import { expectSaga } from 'redux-saga-test-plan';
import { select } from 'redux-saga/effects';
import { getMoves } from '../../selectors/AppStateSelectors';
import {
  CALCULATE_ACTIVE_BOARDS,
  SET_ACTIVE_BOARDS,
} from './activeBoardsActions';
import activeBoardsCalculationSaga from './activeBoardsCalculationSaga';
import {
  activeBoardsForBoardWithThreeMovesMock,
  movesForBoardWithThreeMovesMock,
  movesForCircleFinishedBoardMock,
  movesForUnfinishedBoardMock,
} from '../../../__mocks__';

describe('activeBoardCalculationSaga', () => {
  it('should dispatch setActiveBoards Action, normal case', () => {
    return expectSaga(activeBoardsCalculationSaga)
      .provide([[select(getMoves), movesForBoardWithThreeMovesMock]])
      .put({
        type: SET_ACTIVE_BOARDS,
        payload: activeBoardsForBoardWithThreeMovesMock,
      })
      .dispatch({ type: CALCULATE_ACTIVE_BOARDS })
      .silentRun();
  });

  it(
    'should set activeBoards to all unfinished small boards ' +
      'when small board the last move points to is finished',
    () => {
      // these values depend on the unfinished board mock.
      return expectSaga(activeBoardsCalculationSaga)
        .provide([[select(getMoves), movesForUnfinishedBoardMock]])
        .put({
          type: SET_ACTIVE_BOARDS,
          payload: [
            { x: 0, y: 2 },
            { x: 1, y: 0 },
            { x: 1, y: 2 },
            { x: 2, y: 0 },
            { x: 2, y: 2 },
          ],
        })
        .dispatch({ type: CALCULATE_ACTIVE_BOARDS })
        .silentRun();
    },
  );

  it('should set activeBoards to nothing when whole board is finished', () => {
    return expectSaga(activeBoardsCalculationSaga)
      .provide([[select(getMoves), movesForCircleFinishedBoardMock]])
      .put({ type: SET_ACTIVE_BOARDS, payload: [] })
      .dispatch({ type: CALCULATE_ACTIVE_BOARDS })
      .silentRun();
  });

  // if more put effects happen: this catches it + this checks for the order
  it('should match snapshot', () => {
    return expectSaga(activeBoardsCalculationSaga)
      .provide([[select(getMoves), movesForBoardWithThreeMovesMock]])
      .put({
        type: SET_ACTIVE_BOARDS,
        payload: activeBoardsForBoardWithThreeMovesMock,
      })
      .dispatch({ type: CALCULATE_ACTIVE_BOARDS })
      .silentRun()
      .then((result) => {
        expect(result.toJSON()).toMatchSnapshot();
      });
  });
});
