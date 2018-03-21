// import { expectSaga } from 'redux-saga-test-plan';
// import { CALCULATE_BOARD_VALUE, SET_BOARD_VALUE } from '../../board/boardActions';
// import { select } from 'redux-saga/effects';
// import { getBoards } from '../../selectors/AppStateSelectors';
// import boardStateMock from './boardMock.test';
// import boardCalculationSaga from '../boardCalculationSaga';

describe( 'activeBoardCalculationSaga', () => {
    it( 'should dispatch setAllowedBoard Action, normal case', () => {
        // return expectSaga( boardCalculationSaga )
        //     .provide([
        //                  [select(getBoards), boardStateMock]
        //              ])
        //     .put({type: SET_BOARD_VALUE, payload: {boardPosition: {x: 1, y: 0}, tileValue: Player.Cross}})
        //     .dispatch( {type: CALCULATE_BOARD_VALUE, payload: {x: 1, y: 0}} ) // TODO maybe this needs to be switched to 0,1
        //     .run();
    } );

    it('should set allowedBoards to all unfinished small boards when small board the last move points to is finished',
       () => {

    });


    // if more put effects happen: this catches it + this checks for the order
    it('should match snapshot', () => {
        // return expectSaga(boardCalculationSaga)
        //     .provide([
        //                  [select(getBoards), boardStateMock]
        //              ])
        //     .dispatch( {type: CALCULATE_BOARD_VALUE, payload: {x: 2, y: 1}} )
        //     .run()
        //     .then((result) => {
        //         expect(result.toJSON()).toMatchSnapshot();
        //     });
    });
} );
