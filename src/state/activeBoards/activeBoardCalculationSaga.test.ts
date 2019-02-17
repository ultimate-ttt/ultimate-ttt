import { expectSaga } from 'redux-saga-test-plan';
import { select } from 'redux-saga/effects';
import { getBoards } from '../selectors/AppStateSelectors';
import { CALCULATE_ALLOWED_BOARDS, SET_ALLOWED_BOARDS } from './activeBoardsActions';
import activeBoardsCalculationSaga from './activeBoardsCalculationSaga';
import unfinishedBoardMock from '../../__mocks__/unfinishedBoardMock';
import { circleFinishedBoardMock } from '../../__mocks__/finishedBoardMock';

describe( 'activeBoardCalculationSaga', () => {
    it( 'should dispatch setAllowedBoard Action, normal case', () => {
        return expectSaga( activeBoardsCalculationSaga )
            .provide( [
                          [select( getBoards ), circleFinishedBoardMock]
                      ] )
            .put( {type: SET_ALLOWED_BOARDS, payload: [{x: 2, y: 0}]} )
            .dispatch( {type: CALCULATE_ALLOWED_BOARDS, payload: {x: 2, y: 0}} )
            .silentRun();
    } );

    it( 'should set allowedBoards to all unfinished small boards ' +
        'when small board the last move points to is finished',
        () => {
            // these values depend on the unfinished board mock.
            return expectSaga( activeBoardsCalculationSaga )
                .provide( [
                              [select( getBoards ), unfinishedBoardMock]
                          ] )
                .put( {
                          type: SET_ALLOWED_BOARDS,
                          payload: [{x: 0, y: 2}, {x: 1, y: 0}, {x: 1, y: 2}, {x: 2, y: 0}, {x: 2, y: 2}]} )
                .dispatch( {type: CALCULATE_ALLOWED_BOARDS, payload: {x: 2, y: 1}} )
                .silentRun();
        } );

    // if more put effects happen: this catches it + this checks for the order
    it( 'should match snapshot', () => {
        return expectSaga( activeBoardsCalculationSaga )
            .provide( [
                          [select( getBoards ), circleFinishedBoardMock]
                      ] )
            .put( {type: SET_ALLOWED_BOARDS, payload: [{x: 2, y: 0}]} )
            .dispatch( {type: CALCULATE_ALLOWED_BOARDS, payload: {x: 2, y: 0}} )
            .silentRun()
            .then( ( result ) => {
                expect( result.toJSON() ).toMatchSnapshot();
            } );
    } );
} );
