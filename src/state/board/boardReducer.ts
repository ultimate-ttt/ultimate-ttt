import { cloneState, GenericAction, SmallBoardInformation, TileInformation, TileValue } from '../AppState';
import { SET_BOARD_VALUE, SET_TILE_VALUE } from './boardActions';
import { arePointsEqual } from '../../util/Point';

const getSmallBoardTiles = ( boardX: number, boardY: number ) => {
    let tiles: TileInformation[] = [];
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            tiles.push( {
                            bigBoardPoint: {x: boardX, y: boardY},
                            smallBoardPoint: {x, y},
                            value: TileValue.Empty
                        } );
        }
    }
    return tiles;
};

const getInitialState = () => {

    let state: SmallBoardInformation[] = [];

    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            state.push( {
                            value: TileValue.Empty,
                            point: {x, y},
                            tiles: getSmallBoardTiles( x, y )
                        } );
        }
    }
    return state;
};

const initialState = getInitialState();

const boardReducer = ( state = initialState, action: GenericAction ) => {
    switch (action.type) {

        case SET_TILE_VALUE: {
            let clone = cloneState( state );

            const smallBoardIndex = clone.findIndex( sB => {
                return arePointsEqual( sB.point, action.payload.bigBoardPoint );
            } );

            const smallBoard = clone[smallBoardIndex];

            const tileIndex = smallBoard.tiles.findIndex( t => {
                return arePointsEqual( t.smallBoardPoint, action.payload.smallBoardPoint );
            } );

            smallBoard.tiles[tileIndex].value = action.payload.tileValue;
            return clone;
        }

        case SET_BOARD_VALUE: {
            let clone = cloneState( state );

            const smallBoardIndex = clone.findIndex( sB => {
                return arePointsEqual( sB.point, action.payload.bigBoardPoint );
            } );

            const smallBoard = clone[smallBoardIndex];
            smallBoard.value = action.payload.tileValue;

            return clone;
        }
    }

    return state;
};

export default boardReducer;
