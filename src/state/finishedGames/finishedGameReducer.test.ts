import finishedGameReducer from './finishedGameReducer';
import {
    saveGameData,
    saveGameDataFulfilled,
    saveGameDataPending,
    saveGameDataRejected
} from './saveFinishedGameDataActions';
import { crossFinishedBoardMock } from '../../__mocks__/finishedBoardMock';
import { Player } from '../AppState';

describe( 'finishedGameReducer', () => {
    it( 'should return init state', () => {
        let initState = finishedGameReducer( undefined, {type: 'init'} );
        expect( initState ).not.toBeNull();
        expect( initState ).not.toBeUndefined();
    } );

    const finishedGameMock = {
        winner: Player.Cross,
        gameState: crossFinishedBoardMock,
        // not real data
        moves: [
            {
                boardPosition: {
                    x: 1,
                    y: 0
                },
                tilePosition: {
                    x: 1,
                    y: 1
                },
                player: 0,
                moveNumber: 1
            }],
        saveState: 'pending',
        errorMessage: ''
    };

    describe( 'saveGameData', () => {
        it( 'should add data to array', () => {
            const action = saveGameData( finishedGameMock );
            const newState = finishedGameReducer( [], action );

            expect( newState.length ).toBe( 1 );
        } );

        it( 'should add data to array', () => {
            const action = saveGameData( finishedGameMock );
            const newState = finishedGameReducer( [finishedGameMock], action );

            expect( newState.length ).toBe( 2 );
        } );
    } );

    describe( 'saveGameDataPending', () => {
        it( 'should set data to pending', () => {
            finishedGameMock.saveState = '';
            const action = saveGameDataPending();
            const newState = finishedGameReducer( [finishedGameMock], action );

            expect( newState[0].saveState ).toEqual( 'pending' );
        } );
    } );

    describe( 'saveGameDataFulfilled', () => {
        it( 'should set data to fulfilled', () => {
            finishedGameMock.saveState = '';
            const action = saveGameDataFulfilled( '123' );
            const newState = finishedGameReducer( [finishedGameMock], action );

            expect( newState[0].saveState ).toEqual( 'fulfilled' );
        } );

        it( 'should set id to provided id', () => {
            finishedGameMock.saveState = '';
            const action = saveGameDataFulfilled( '123' );
            const newState = finishedGameReducer( [finishedGameMock], action );

            expect( newState[0].id ).toEqual( '123' );
        } );
    } );

    describe( 'saveGameDataRejected', () => {
        it( 'should set data to rejected', () => {
            finishedGameMock.saveState = '';
            const action = saveGameDataRejected( 'error' );
            const newState = finishedGameReducer( [finishedGameMock], action );

            expect( newState[0].saveState ).toEqual( 'rejected' );
            expect( newState[0].errorMessage ).toEqual( 'error' );
        } );
    } );
} );