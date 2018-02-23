import { cloneState, GenericAction, TileValue } from '../AppState';
import { ADD_SYMBOL } from './tileAction';
import { arePointsEqual } from '../../util/Point';

const getInitialTiles = () => {
    let state = [];
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            for (let tileX = 0; tileX < 3; tileX++) {
                for (let tileY = 0; tileY < 3; tileY++) {
                    state.push( {
                                    bigBoardPoint: {x, y},
                                    smallBoardPoint: {x: tileX, y: tileY},
                                    value: TileValue.Empty
                                } );
                }
            }
        }
    }
    return state;
};

const initialState = getInitialTiles();

const tileReducer = ( state = initialState, action: GenericAction ) => {
    switch (action.type) {

        case ADD_SYMBOL: {
            let clone = cloneState( state );

            const index = clone.findIndex( tile => {
                return arePointsEqual( tile.bigBoardPoint, action.payload.bigBoardPoint )
                    && arePointsEqual( tile.smallBoardPoint, action.payload.smallBoardPoint );
            } );
            clone[index].value = action.payload.player;
            return clone;
        }
    }

    return state;
};

export default tileReducer;
