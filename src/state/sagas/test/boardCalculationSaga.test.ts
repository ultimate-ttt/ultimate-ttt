import { expectSaga } from 'redux-saga-test-plan';
import boardCalculationSaga from '../boardCalculationSaga';
import { getBoards } from '../../selectors/AppStateSelectors';
import { select } from 'redux-saga/effects';
import { CALCULATE_BOARD_VALUE, SET_BOARD_VALUE } from '../../board/boardActions';
import boardStateMock from './boardMock.test';
import { Player } from '../../AppState';

describe( 'boardCalculationSaga', () => {
    it( 'should dispatch at least the following actions, order not tested', () => {
        return expectSaga( boardCalculationSaga )
            .provide([
                         [select(getBoards), boardStateMock]
                     ])
            .put({type: SET_BOARD_VALUE, payload: {boardPosition: {x: 1, y: 0}, tileValue: Player.Cross}})
            .dispatch( {type: CALCULATE_BOARD_VALUE, payload: {x: 1, y: 0}} ) // TODO maybe this needs to be switched to 0,1
            .run();
    } );

    // if more put effects happen: this catches it + this checks for the order
    it('should match snapshot', () => {
        return expectSaga(boardCalculationSaga)
            .provide([
                         [select(getBoards), boardStateMock]
                     ])
            .dispatch( {type: CALCULATE_BOARD_VALUE, payload: {x: 1, y: 0}} )
            .run()
            .then((result) => {
                expect(result.toJSON()).toMatchSnapshot();
            });
    });
} );
