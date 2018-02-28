import { Point } from '../../util/Point';
import { GenericAction } from '../AppState';

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

const activeBoardReducer = ( state = initialState, action: GenericAction ) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
};

export default activeBoardReducer;