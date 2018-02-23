import tileReducer from './tileReducer';
import { Player } from '../AppState';
import { addSymbol } from './tileAction';

describe( 'tileReducer', () => {
    it( 'should return init state', () => {
        let initState = tileReducer( undefined, {type: 'init'} );
        expect( initState ).not.toBeNull();
        expect( initState ).not.toBeUndefined();
    } );

    it( 'should add symbol of Circle Player', () => {
        const bigBoardPoint = {x: 0, y: 0};
        const smallBoardPoint = {x: 0, y: 0};
        const action = addSymbol( bigBoardPoint, smallBoardPoint, Player.Circle );
        let newState = tileReducer( undefined, action );

        expect( newState[0].value ).toEqual( Player.Circle );
    } );

    it( 'should add symbol of Cross Player', () => {
        const bigBoardPoint = {x: 0, y: 0};
        const smallBoardPoint = {x: 2, y: 1};
        const action = addSymbol( bigBoardPoint, smallBoardPoint, Player.Cross );
        const newState = tileReducer( undefined, action );

        const editedTile = newState.find( ( element ) => {
            return element.smallBoardPoint.x === smallBoardPoint.x
                && element.smallBoardPoint.y === smallBoardPoint.y
                && element.bigBoardPoint.x === bigBoardPoint.x
                && element.bigBoardPoint.y === bigBoardPoint.y;
        } );

        expect( editedTile ).not.toBeUndefined();
        expect( editedTile!.value ).toEqual( Player.Cross );
    } );
} );
