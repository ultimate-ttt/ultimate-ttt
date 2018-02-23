import { arePointsEqual, Point } from './Point';
import { Tile } from '../state/AppState';

export const getSmallBoard = ( allTiles: Tile[], pointInBigBoard: Point ) => {
    return allTiles.filter( ( el: Tile ) => arePointsEqual( el.bigBoardPoint, pointInBigBoard ) );
};