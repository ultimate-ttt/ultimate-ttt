import boardReducer from './boardReducer';

describe( 'boardReducer', () => {

    it( 'should return init state', () => {
        let initState = boardReducer( undefined, {type: 'init'} );
        expect( initState ).not.toBeNull();
        expect( initState ).not.toBeUndefined();
    } );

    // it( 'should add symbol of Circle Player', () => {
    //     const boardPosition = {x: 0, y: 0};
    //     const tilePosition = {x: 0, y: 0};
    //     const action = setTileValue( boardPosition, tilePosition, TileValue.Circle );
    //     let newState = boardReducer( undefined, action );
    //
    //     expect( newState[0].value ).toEqual( TileValue.Circle );
    // } );
    //
    // it( 'should add symbol of Cross Player', () => {
    //     const boardPosition = {x: 0, y: 0};
    //     const tilePosition = {x: 2, y: 1};
    //     const action = setTileValue( boardPosition, tilePosition, TileValue.Cross );
    //     const newState = boardReducer( undefined, action );
    //
    //     const editedTile = newState.find( ( element ) => {
    //         return element.tilePosition.x === tilePosition.x
    //             && element.tilePosition.y === tilePosition.y
    //             && element.boardPosition.x === boardPosition.x
    //             && element.boardPosition.y === boardPosition.y;
    //     } );
    //
    //     expect( editedTile ).not.toBeUndefined();
    //     expect( editedTile!.value ).toEqual( TileValue.Cross );
    // } );
} );
