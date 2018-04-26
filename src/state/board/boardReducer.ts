import { cloneState, GenericAction, SmallBoardInformation, SmallTileInformation, TileValue } from '../AppState';
import { SET_BOARD_VALUE, SET_TILE_VALUE } from './boardActions';
import { arePointsEqual, Point } from '../../util/Point';
import { RESTART_GAME } from '../commonAction';

const getSmallBoardTiles = ( boardX: number, boardY: number ) => {
    let tiles: SmallTileInformation[] = [];
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            tiles.push( {
                            boardPosition: {x: boardX, y: boardY},
                            position: {x, y},
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
                            position: {x, y},
                            tiles: getSmallBoardTiles( x, y )
                        } );
        }
    }
    return state;
};

const getSmallBoard = (bigBoard: SmallBoardInformation[], boardPosition: Point) => {
    const smallBoardIndex = bigBoard.findIndex( board => {
        return arePointsEqual( board.position, boardPosition );
    } );
    return bigBoard[smallBoardIndex];
};

const initialState = getInitialState();

const boardReducer = ( state = initialState, action: GenericAction ) => {
    switch (action.type) {

        case SET_TILE_VALUE: {
            let clone = cloneState( state );

            const smallBoard = getSmallBoard(clone, action.payload.boardPosition);
            const tileIndex = smallBoard.tiles.findIndex( tile => {
                return arePointsEqual( tile.position, action.payload.tilePosition );
            } );
            smallBoard.tiles[tileIndex].value = action.payload.tileValue;

            return clone;
        }
        case SET_BOARD_VALUE: {
            let clone = cloneState( state );

            const smallBoard = getSmallBoard(clone, action.payload.boardPosition);
            smallBoard.value = action.payload.tileValue;

            return clone;
        }
        case RESTART_GAME: {
            return initialState;
        }
    }

    return state;
};

export default boardReducer;
