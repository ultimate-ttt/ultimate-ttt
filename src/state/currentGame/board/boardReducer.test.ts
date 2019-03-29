import boardReducer from './boardReducer';
import { setTileValue } from './boardActions';
import { crossFinishedBoardMock } from '../../../__mocks__/finishedBoardMock';
import { SmallBoardInformation, SmallTileInformation, TileValue } from '../../AppState';
import { restartGame } from '../../commonAction';
import { arePointsEqual } from '../../../util';

describe( 'boardReducer', () => {

    it( 'should return init state', () => {
        const initState = boardReducer( undefined, {type: 'init'} );
        expect( initState ).not.toBeNull();
        expect( initState ).not.toBeUndefined();
    } );

    describe('setTileValue', () => {
        it( 'should add symbol of Circle Player', () => {
            const boardPosition = {x: 0, y: 0};
            const tilePosition = {x: 0, y: 0};
            const action = setTileValue( boardPosition, tilePosition, TileValue.Circle );
            const newState = boardReducer( undefined, action );

            const foundBoard = newState.find((board: SmallBoardInformation) => {
                return arePointsEqual(board.position, boardPosition);
            } );
            const foundTile = foundBoard!.tiles.find((tile: SmallTileInformation) => {
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

            const foundBoard = newState.find((board: SmallBoardInformation) => {
                return arePointsEqual(board.position, boardPosition);
            } );
            const foundTile = foundBoard!.tiles.find((tile: SmallTileInformation) => {
                return arePointsEqual(tile.position, tilePosition);
            });

            expect(foundTile).not.toBeUndefined();
            expect(foundTile!.value).not.toBeUndefined();
            expect(foundTile!.value).toEqual( TileValue.Cross );
        } );
    });

    describe('restartGame', () => {
        it('should return the initial state', () => {
            const action = restartGame();
            const newState = boardReducer(crossFinishedBoardMock, action);

            expect(newState[0].value).toBe(TileValue.Empty);
            expect(newState[1].tiles[0].value).toBe(TileValue.Empty);
        });
    });
} );
