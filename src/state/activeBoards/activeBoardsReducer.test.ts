import activeBoardsReducer from './activeBoardsReducer';
import { setAllowedBoards } from './activeBoardsActions';

describe( 'activeBoardsReducer', () => {

    it( 'should return init state', () => {
        const initState = activeBoardsReducer( undefined, {type: 'init'} );
        expect( initState ).not.toBeNull();
        expect( initState ).not.toBeUndefined();
    } );

    it('should set the activeBoards to the points in the point array', () => {
        const newAllowedBoards = [{x: 0, y: 0}, {x: 2, y: 0}, {x: 2, y: 2}];
        const action = setAllowedBoards(newAllowedBoards);
        const newState = activeBoardsReducer( undefined, action);

        expect(newState).toEqual(newAllowedBoards);
    });
});