import boardReducer from './boardReducer';
import { setTileValue } from './boardActions';
import { TileValue } from '../AppState';
import { arePointsEqual } from '../../util';

describe( 'boardReducer', () => {

    it( 'should return init state', () => {
        let initState = boardReducer( undefined, {type: 'init'} );
        expect( initState ).not.toBeNull();
        expect( initState ).not.toBeUndefined();
    } );

    it( 'should add symbol of Circle Player', () => {
        const boardPosition = {x: 0, y: 0};
        const tilePosition = {x: 0, y: 0};
        const action = setTileValue( boardPosition, tilePosition, TileValue.Circle );
        let newState = boardReducer( undefined, action );

        const board = newState.find((board) => {
            return arePointsEqual(board.position, boardPosition);
        } );
        const tile = board!.tiles.find((tile) => {
           return arePointsEqual(tile.position, tilePosition);
        });
        expect(tile!.value).toEqual( TileValue.Circle );
    } );

    it( 'should add symbol of Cross Player', () => {
        const boardPosition = {x: 0, y: 0};
        const tilePosition = {x: 0, y: 0};
        const action = setTileValue( boardPosition, tilePosition, TileValue.Cross );
        let newState = boardReducer( undefined, action );

        const board = newState.find((board) => {
            return arePointsEqual(board.position, boardPosition);
        } );
        const tile = board!.tiles.find((tile) => {
            return arePointsEqual(tile.position, tilePosition);
        });
        expect(tile!.value).not.toBeUndefined();
        expect(tile!.value).toEqual( TileValue.Cross );
    } );
} );
