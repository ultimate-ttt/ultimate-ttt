import { expectSaga } from 'redux-saga-test-plan';
import saveFinishedGameDataSaga from './saveFinishedGameDataSaga';
import { getFinishedGameData } from '../selectors/FinishedGameStateSelectors';
import { select } from 'redux-saga/effects';
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

describe( 'saveFinishedGameDataSaga', () => {
    it( 'should make a successful fetch call', () => {
        window.location.host = 'localhost';
        window.fetch = jest.fn().mockImplementation(
            () => Promise.resolve( mockResponse( 200, '', '' ) ) );

        const finishedGameDataMock = {
            winner: 'X',
            gameState: circleFinishedBoardMock,
            moves: [{
                boardPosition: {x: 0, y: 0},
                tilePosition: {x: 0, y: 0},
                player: Player.Cross,
                moveNumber: 1
            }],
            isReplay: false
        };

        return expectSaga( saveFinishedGameDataSaga )
            .provide( [
                          [select( getFinishedGameData ), finishedGameDataMock]
                      ] )
            .put( {type: SAVE_GAME_DATA_PENDING} )
            .put( {type: SAVE_GAME_DATA_FULFILLED} )
            .dispatch( {type: SAVE_GAME_DATA} )
            .silentRun();

        // TODO: get the following thing to work with mockImplementation:
        // expect(window.fetch).toHaveBeenCalledTimes(1);
    } );

    it( 'should dispatch error when there is an error in the fetch call', () => {
        window.location.host = 'localhost';
        window.fetch = jest.fn().mockImplementation(
            () => Promise.resolve( mockResponse( 500, 'error', '' ) ) );

        const finishedGameDataMock = {
            winner: 'X',
            gameState: circleFinishedBoardMock,
            moves: [{
                boardPosition: {x: 0, y: 0},
                tilePosition: {x: 0, y: 0},
                player: Player.Cross,
                moveNumber: 1
            }],
            isReplay: false
        };

        return expectSaga( saveFinishedGameDataSaga )
            .provide( [
                          [select( getFinishedGameData ), finishedGameDataMock]
                      ] )
            .put( {type: SAVE_GAME_DATA_PENDING} )
            .put( {type: SAVE_GAME_DATA_REJECTED, errorMessage: '500: error'} )
            .dispatch( {type: SAVE_GAME_DATA} )
            .silentRun();
    } );

    it( 'should match snapshot when erroring', () => {
        window.location.host = 'localhost';
        window.fetch = jest.fn().mockImplementation(
            () => Promise.resolve( mockResponse( 500, 'error', '' ) ) );

        const finishedGameDataMock = {
            winner: 'X',
            gameState: circleFinishedBoardMock,
            moves: [{
                boardPosition: {x: 0, y: 0},
                tilePosition: {x: 0, y: 0},
                player: Player.Cross,
                moveNumber: 1
            }],
            isReplay: false
        };

        return expectSaga( saveFinishedGameDataSaga )
            .provide( [
                          [select( getFinishedGameData ), finishedGameDataMock]
                      ] )
            .put( {type: SAVE_GAME_DATA_PENDING} )
            .put( {type: SAVE_GAME_DATA_REJECTED, errorMessage: '500: error'} )
            .dispatch( {type: SAVE_GAME_DATA} )
            .silentRun()
            .then( ( result ) => {
                expect( result.toJSON() ).toMatchSnapshot();
            } );
    } );

    it( 'should match snapshot when receiving okay', () => {
        window.location.host = 'localhost';
        window.fetch = jest.fn().mockImplementation(
            () => Promise.resolve( mockResponse( 200, '', '' ) ) );

        const finishedGameDataMock = {
            winner: 'X',
            gameState: circleFinishedBoardMock,
            moves: [{
                boardPosition: {x: 0, y: 0},
                tilePosition: {x: 0, y: 0},
                player: Player.Cross,
                moveNumber: 1
            }],
            isReplay: false
        };

        return expectSaga( saveFinishedGameDataSaga )
            .provide( [
                          [select( getFinishedGameData ), finishedGameDataMock]
                      ] )
            .put( {type: SAVE_GAME_DATA_PENDING} )
            .put( {type: SAVE_GAME_DATA_FULFILLED} )
            .dispatch( {type: SAVE_GAME_DATA} )
            .silentRun()
            .then( ( result ) => {
                expect( result.toJSON() ).toMatchSnapshot();
            } );
    } );
} );