import moveReducer from './moveReducer';
import { registerMove } from './moveAction';
import { Player } from '../../AppState';
import { restartGame } from '../../commonAction';

describe( 'moveReducer', () => {
    it( 'should return init state', () => {
        let initState = moveReducer( undefined, {type: 'init'} );
        expect( initState ).not.toBeNull();
        expect( initState ).not.toBeUndefined();
    } );

    it( 'should add a move', () => {
        const boardPosition = {x: 1, y: 2};
        const tilePosition = {x: 2, y: 2};
        const action = registerMove( boardPosition, tilePosition, Player.Cross );
        let newState = moveReducer( undefined, action );

        expect( newState[0].boardPosition.x ).toEqual( 1 );
        expect( newState[0].boardPosition.y ).toEqual( 2 );
        expect( newState[0].tilePosition.x ).toEqual( 2 );
        expect( newState[0].tilePosition.y ).toEqual( 2 );
        expect( newState[0].player ).toEqual( Player.Cross );

        expect( newState[0].moveNumber ).toEqual( 1 );
    } );

    it( 'should count up moveNumber', () => {
        const boardPosition1 = {x: 2, y: 2};
        const tilePosition1 = {x: 1, y: 2};
        const action1 = registerMove( boardPosition1, tilePosition1, Player.Cross );

        const boardPosition2 = {x: 1, y: 2};
        const tilePosition2 = {x: 0, y: 0};
        const action2 = registerMove( boardPosition2, tilePosition2, Player.Cross );

        const boardPosition3 = {x: 0, y: 0};
        const tilePosition3 = {x: 2, y: 2};
        const action3 = registerMove( boardPosition3, tilePosition3, Player.Cross );

        const newState1 = moveReducer( undefined, action1 );
        const newState2 = moveReducer( newState1, action2 );
        const newState3 = moveReducer( newState2, action3 );

        expect( newState1[0].moveNumber ).toEqual( 1 );
        expect( newState2[1].moveNumber ).toEqual( 2 );
        expect( newState3[2].moveNumber ).toEqual( 3 );
    } );

    describe( 'restartGame', () => {
        it( 'should return the initial state', () => {
            const action = restartGame();
            const state = [{
                boardPosition: {x: 0, y: 0},
                tilePosition: {x: 0, y: 0},
                player: Player.Cross,
                moveNumber: 1
            }
            ];
            const newState = moveReducer(state, action );

            expect( newState).not.toBeUndefined();
            expect( newState.length ).toBe( 0 );
        } );
    } );
} );