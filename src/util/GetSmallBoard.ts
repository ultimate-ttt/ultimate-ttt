import { arePointsEqual, Point } from './Point';
import { TileInformation } from '../state/AppState';

export const getSmallBoard = ( allTiles: TileInformation[], pointInBigBoard: Point ) => {
    return allTiles.filter( ( el: TileInformation ) => arePointsEqual( el.bigBoardPoint, pointInBigBoard ) );
};