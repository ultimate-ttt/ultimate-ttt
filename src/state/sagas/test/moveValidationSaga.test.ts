import { expectSaga } from 'redux-saga-test-plan';
import playerMovedSaga from '../moveValidationSaga';
import { getCurrentPlayer } from '../../selectors/AppStateSelectors';
import { Player } from '../../AppState';
import { CHANGE_PLAYER, CHECK_GAME_FINISHED, PLAYER_MOVED } from '../../game/gameAction';
import { select } from 'redux-saga/effects';
import { REGISTER_MOVE } from '../../moves/moveAction';
import { CALCULATE_BOARD_VALUE, SET_TILE_VALUE } from '../../board/boardActions';
import { CALCULATE_ALLOWED_BOARDS } from '../../activeBoards/activeBoardActions';

// TODO: boardPoint / bigBoardPoint / boardPosition: einheitlicher Name. (Code Refactoring)
describe( 'moveValidationSaga', () => {
    it( 'should dispatch at least the following actions, order not tested', () => {
        return expectSaga( playerMovedSaga )
            .provide( [
                          [select( getCurrentPlayer ), Player.Cross]
                      ] )
            .put( {
                      type: REGISTER_MOVE,
                      payload:
                          {
                              bigBoardPoint: {x: 1, y: 1},
                              smallBoardPoint: {x: 2, y: 2},
                              player: Player.Cross
                          }
                  } )
            .put( {
                      type: SET_TILE_VALUE,
                      payload: {
                          boardPosition: {x: 1, y: 1},
                          tilePosition: {x: 2, y: 2},
                          tileValue: Player.Cross
                      }
                  } )
            .put( {type: CHANGE_PLAYER, payload: {}} )
            .put( {type: CALCULATE_BOARD_VALUE, payload: {x: 1, y: 1}} )
            .put( {type: CALCULATE_ALLOWED_BOARDS, payload: {x: 2, y: 2}} )
            .put( {type: CHECK_GAME_FINISHED} )
            .dispatch( {type: PLAYER_MOVED, payload: {boardPoint: {x: 1, y: 1}, tilePoint: {x: 2, y: 2}}} )
            .run();
    } );

    // if more put effects happen: this catches it + this checks for the order
    it( 'should match snapshot', () => {
        return expectSaga( playerMovedSaga )
            .provide( [
                          [select( getCurrentPlayer ), Player.Cross]
                      ] )
            .dispatch( {type: PLAYER_MOVED, payload: {boardPoint: {x: 1, y: 1}, tilePoint: {x: 2, y: 2}}} )
            .run()
            .then( ( result ) => {
                expect( result.toJSON() ).toMatchSnapshot();
            } );
    } );
} );