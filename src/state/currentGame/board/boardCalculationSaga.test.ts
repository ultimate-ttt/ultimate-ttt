import { expectSaga } from 'redux-saga-test-plan';
import boardCalculationSaga from './boardCalculationSaga';
import { getMoves } from '../../selectors/AppStateSelectors';
import { select } from 'redux-saga/effects';
import { CALCULATE_BOARD_VALUE, SET_BOARD_VALUE } from './boardActions';
import { Player } from '../../AppState';
import { movesForUnfinishedBoardMock } from '../../../mocks';

describe('boardCalculationSaga', () => {
  it('should dispatch the set board value for the board with the Cross Player', () => {
    return expectSaga(boardCalculationSaga)
      .provide([[select(getMoves), movesForUnfinishedBoardMock]])
      .put({
        type: SET_BOARD_VALUE,
        payload: { boardPosition: { x: 0, y: 1 }, tileValue: Player.Cross },
      })
      .dispatch({ type: CALCULATE_BOARD_VALUE, payload: { x: 0, y: 1 } })
      .silentRun();
  });

  it('should dispatch the set board value for the board with the Circle Player', () => {
    return expectSaga(boardCalculationSaga)
      .provide([[select(getMoves), movesForUnfinishedBoardMock]])
      .put({
        type: SET_BOARD_VALUE,
        payload: { boardPosition: { x: 1, y: 1 }, tileValue: Player.Circle },
      })
      .dispatch({ type: CALCULATE_BOARD_VALUE, payload: { x: 1, y: 1 } })
      .silentRun();
  });

  // if more put effects happen: this catches it + this checks for the order
  it('should match snapshot', () => {
    return expectSaga(boardCalculationSaga)
      .provide([[select(getMoves), movesForUnfinishedBoardMock]])
      .dispatch({ type: CALCULATE_BOARD_VALUE, payload: { x: 0, y: 0 } })
      .silentRun()
      .then((result) => {
        expect(result.toJSON()).toMatchSnapshot();
      });
  });
});
