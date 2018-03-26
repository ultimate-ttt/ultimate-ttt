import boardReducer from './boardReducer';
import { setTileValue } from './boardActions';
import { TileValue } from '../AppState';
import { arePointsEqual } from '../../util';

describe( 'boardReducer', () => {

    it( 'should return init state', () => {
        const initState = boardReducer( undefined, {type: 'init'} );
        expect( initState ).not.toBeNull();
        expect( initState ).not.toBeUndefined();
    } );

    it( 'should add symbol of Circle Player', () => {
        const boardPosition = {x: 0, y: 0};
        const tilePosition = {x: 0, y: 0};
        const action = setTileValue( boardPosition, tilePosition, TileValue.Circle );
        const newState = boardReducer( undefined, action );

        const foundBoard = newState.find((board) => {
            return arePointsEqual(board.position, boardPosition);
        } );
        const foundTile = foundBoard!.tiles.find((tile) => {
           return arePointsEqual(tile.position, tilePosition);
        });

        expect(foundTile).not.toBeUndefined();
        expect(foundTile!.value).not.toBeUndefined();
        expect(foundTile!.value).toEqual( TileValue.Circle );
    } );

    it( 'should add symbol of Cross Player', () => {
        const boardPosition = {x: 0, y: 0};
        const tilePosition = {x: 0, y: 0};
        const action = setTileValue( boardPosition, tilePosition, TileValue.Cross );
        const newState = boardReducer( undefined, action );

        const foundBoard = newState.find((board) => {
            return arePointsEqual(board.position, boardPosition);
        } );
        const foundTile = foundBoard!.tiles.find((tile) => {
            return arePointsEqual(tile.position, tilePosition);
        });

        expect(foundTile).not.toBeUndefined();
        expect(foundTile!.value).not.toBeUndefined();
        expect(foundTile!.value).toEqual( TileValue.Cross );
    } );
} );
