import { Point } from '../../util/Point';
import { GenericAction } from '../AppState';
import { SET_ALLOWED_BOARDS } from './activeBoardsActions';
import { RESTART_GAME } from '../commonAction';

const getAllPoints = () => {
    let points: Point[] = [];

    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            points.push( {x, y} );
        }
    }

    return points;
};

const initialState: Point[] = getAllPoints();

const activeBoardsReducer = ( state = initialState, action: GenericAction ) => {
    switch (action.type) {
        case SET_ALLOWED_BOARDS: {
            return action.payload;
        }
        case RESTART_GAME: {
            return initialState;
        }
        default: {
            return state;
        }
    }
};

export default activeBoardsReducer;