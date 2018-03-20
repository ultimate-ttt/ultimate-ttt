import gameReducer from './gameReducer';
import { changePlayer, gameFinished } from './gameAction';
import { Player } from '../AppState';

describe( 'gameReducer', () => {
    it( 'should return init state', () => {
        let initState = gameReducer( undefined, {type: 'init'} );
        expect( initState ).not.toBeNull();
        expect( initState ).not.toBeUndefined();
    } );

    describe( 'changePlayer', () => {
        it( 'should change player from X to O', () => {
            const action = changePlayer();
            let newState = gameReducer( {currentPlayer: Player.Cross, isFinished: false}, action );

            expect( newState.currentPlayer ).toEqual( Player.Circle );
        } );

        it( 'should change player from O to X', () => {
            const action = changePlayer();
            let newState = gameReducer( {currentPlayer: Player.Circle, isFinished: false}, action );

            expect( newState.currentPlayer ).toEqual( Player.Cross );
        } );
    } );

    describe('finishGame', () => {
       it('should change the state of the game according to the action', () => {
          const action = gameFinished(Player.Circle);
          let newState = gameReducer({currentPlayer: Player.Circle, isFinished: false}, action);

          expect(newState.isFinished).toBe(true);
          expect(newState.winningPlayer).toEqual(Player.Circle);
          // TODO: Cross.
       });

       // TODO: null version.
    });
} );