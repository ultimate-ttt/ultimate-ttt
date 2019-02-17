import { expectSaga } from 'redux-saga-test-plan';
import saveFinishedGameDataSaga from './saveFinishedGameDataSaga';
import { circleFinishedBoardMock } from '../../__mocks__/finishedBoardMock';
import { Player } from '../AppState';
import {
    SAVE_GAME_DATA,
    SAVE_GAME_DATA_FULFILLED,
    SAVE_GAME_DATA_PENDING,
    SAVE_GAME_DATA_REJECTED
} from './saveFinishedGameDataActions';

const mockResponse = ( status: number, statusText: string, response: BodyInit ) => {
    return new Response( response, {
        status: status,
        statusText: statusText,
        headers: {
            'Content-type': 'application/json'
        }
    } );
};

const finishedGameDataMock = {
    winner: 'X',
    gameState: circleFinishedBoardMock,
    moves: [{
        boardPosition: {x: 0, y: 0},
        tilePosition: {x: 0, y: 0},
        player: Player.Cross,
        moveNumber: 1
    }]
};

describe( 'saveFinishedGameDataSaga', () => {
    it( 'should make a successful fetch call', () => {
        window.location.host = 'localhost';
        window.fetch = jest.fn().mockImplementation(
            () => Promise.resolve( mockResponse( 200, '', '' ) ) );

        return expectSaga( saveFinishedGameDataSaga )
            .put( {type: SAVE_GAME_DATA_PENDING} )
            .put( {type: SAVE_GAME_DATA_FULFILLED} )
            .dispatch( {type: SAVE_GAME_DATA, payload: finishedGameDataMock} )
            .silentRun();
    } );

    it( 'should dispatch error when there is an error in the fetch call', () => {
        window.location.host = 'localhost';
        window.fetch = jest.fn().mockImplementation(
            () => Promise.resolve( mockResponse( 500, 'error', '' ) ) );

        return expectSaga( saveFinishedGameDataSaga )
            .put( {type: SAVE_GAME_DATA_PENDING} )
            .put( {type: SAVE_GAME_DATA_REJECTED, payload: '500: error'} )
            .dispatch( {type: SAVE_GAME_DATA, payload: finishedGameDataMock} )
            .silentRun();
    } );

    it( 'should match snapshot when erroring', () => {
        window.location.host = 'localhost';
        window.fetch = jest.fn().mockImplementation(
            () => Promise.resolve( mockResponse( 500, 'error', '' ) ) );

        return expectSaga( saveFinishedGameDataSaga )

            .put( {type: SAVE_GAME_DATA_PENDING} )
            .put( {type: SAVE_GAME_DATA_REJECTED, payload: '500: error'} )
            .dispatch( {type: SAVE_GAME_DATA, payload: finishedGameDataMock} )
            .silentRun()
            .then( ( result ) => {
                expect( result.toJSON() ).toMatchSnapshot();
            } );
    } );

    it( 'should match snapshot when receiving okay', () => {
        window.location.host = 'localhost';
        window.fetch = jest.fn().mockImplementation(
            () => Promise.resolve( mockResponse( 200, '', '' ) ) );

        return expectSaga( saveFinishedGameDataSaga )
            .put( {type: SAVE_GAME_DATA_PENDING} )
            .put( {type: SAVE_GAME_DATA_FULFILLED} )
            .dispatch( {type: SAVE_GAME_DATA, payload: finishedGameDataMock} )
            .silentRun()
            .then( ( result ) => {
                expect( result.toJSON() ).toMatchSnapshot();
            } );
    } );
} );