import { Tile, TileValue } from '../../state/AppState';
import { Point } from '../Point';
import { reduceEachSmallBoardToOneValue } from '../ReduceBoard';

const getTile = ( boardX: number, boardY: number, value: TileValue ) => {
    return {
        bigBoardPoint: {x: -1, y: -1},
        smallBoardPoint: {x: boardX, y: boardY},
        value: value
    };
};

const copyArray = (array: Tile[]) => {
    return JSON.parse( JSON.stringify( array ) );
};

describe('reduceBoard', () => {

    it('should reduce a board with ALL small boards won to 9 tiles with one value', () => {
        const smallBoardCrossWins = [
            getTile( 0, 0, TileValue.Cross ),
            getTile( 0, 1, TileValue.Cross ),
            getTile( 0, 2, TileValue.Cross ),

            getTile( 1, 0, TileValue.Circle ),
            getTile( 1, 1, TileValue.Cross ),
            getTile( 1, 2, TileValue.Circle ),

            getTile( 2, 0, TileValue.Cross ),
            getTile( 2, 1, TileValue.Circle ),
            getTile( 2, 2, TileValue.Circle ),
        ];
        const smallBoardCrossWins2 = [
            getTile( 0, 0, TileValue.Empty ),
            getTile( 0, 1, TileValue.Circle ),
            getTile( 0, 2, TileValue.Cross ),

            getTile( 1, 0, TileValue.Empty),
            getTile( 1, 1, TileValue.Cross ),
            getTile( 1, 2, TileValue.Circle),

            getTile( 2, 0, TileValue.Cross ),
            getTile( 2, 1, TileValue.Circle ),
            getTile( 2, 2, TileValue.Circle ),
        ];
        const smallBoardCircleWins = [
            getTile( 0, 0, TileValue.Cross ),
            getTile( 0, 1, TileValue.Circle ),
            getTile( 0, 2, TileValue.Empty ),

            getTile( 1, 0, TileValue.Empty ),
            getTile( 1, 1, TileValue.Cross ),
            getTile( 1, 2, TileValue.Cross ),

            getTile( 2, 0, TileValue.Circle ),
            getTile( 2, 1, TileValue.Circle ),
            getTile( 2, 2, TileValue.Circle ),
        ];
        const smallBoardCircleWins2 = [
            getTile( 0, 0, TileValue.Empty ),
            getTile( 0, 1, TileValue.Circle ),
            getTile( 0, 2, TileValue.Circle ),

            getTile( 1, 0, TileValue.Cross),
            getTile( 1, 1, TileValue.Circle ),
            getTile( 1, 2, TileValue.Cross),

            getTile( 2, 0, TileValue.Cross ),
            getTile( 2, 1, TileValue.Circle ),
            getTile( 2, 2, TileValue.Cross ),
        ];

        let bigBoard: Tile[] = [];

        const pushAllInside = (whereToPush: Tile[], elements: Tile[], bigBoardPoint: Point) => {
            elements.forEach((el) => {
                el.bigBoardPoint = bigBoardPoint;
                whereToPush.push(el);
            });
            return whereToPush;
        };

        bigBoard = pushAllInside(bigBoard, copyArray(smallBoardCrossWins), {x: 0, y: 0});
        bigBoard = pushAllInside(bigBoard, copyArray(smallBoardCrossWins), {x: 0, y: 1});
        bigBoard = pushAllInside(bigBoard, copyArray(smallBoardCrossWins2), {x: 0, y: 2});
        bigBoard = pushAllInside(bigBoard, copyArray(smallBoardCircleWins2), {x: 1, y: 0});
        bigBoard = pushAllInside(bigBoard, copyArray(smallBoardCrossWins), {x: 1, y: 1});
        bigBoard = pushAllInside(bigBoard, copyArray(smallBoardCircleWins2), {x: 1, y: 2});
        bigBoard = pushAllInside(bigBoard, copyArray(smallBoardCrossWins2), {x: 2, y: 0});
        bigBoard = pushAllInside(bigBoard, copyArray(smallBoardCircleWins), {x: 2, y: 1});
        const input = pushAllInside(bigBoard, copyArray(smallBoardCircleWins2), {x: 2, y: 2});

        const expectedResult = [
            getTile( 0, 0, TileValue.Cross ),
            getTile( 0, 1, TileValue.Cross ),
            getTile( 0, 2, TileValue.Cross ),

            getTile( 1, 0, TileValue.Circle),
            getTile( 1, 1, TileValue.Cross ),
            getTile( 1, 2, TileValue.Circle),

            getTile( 2, 0, TileValue.Cross ),
            getTile( 2, 1, TileValue.Circle ),
            getTile( 2, 2, TileValue.Circle ),
        ];
        expectedResult.forEach((el) => {
            el.bigBoardPoint.x = el.smallBoardPoint.x;
            el.bigBoardPoint.y = el.smallBoardPoint.y;
        });

        const actualResult = reduceEachSmallBoardToOneValue(input);

        expect(actualResult).toEqual(expectedResult);
    });

    it('should reduce a board with SOME small boards won to 9 tiles with one value', () => {
        const smallBoardCrossWins = [
            getTile( 0, 0, TileValue.Cross ),
            getTile( 0, 1, TileValue.Cross ),
            getTile( 0, 2, TileValue.Cross ),

            getTile( 1, 0, TileValue.Circle ),
            getTile( 1, 1, TileValue.Cross ),
            getTile( 1, 2, TileValue.Circle ),

            getTile( 2, 0, TileValue.Cross ),
            getTile( 2, 1, TileValue.Circle ),
            getTile( 2, 2, TileValue.Circle ),
        ];
        const smallBoardCrossWins2 = [
            getTile( 0, 0, TileValue.Empty ),
            getTile( 0, 1, TileValue.Circle ),
            getTile( 0, 2, TileValue.Cross ),

            getTile( 1, 0, TileValue.Empty),
            getTile( 1, 1, TileValue.Cross ),
            getTile( 1, 2, TileValue.Circle),

            getTile( 2, 0, TileValue.Cross ),
            getTile( 2, 1, TileValue.Circle ),
            getTile( 2, 2, TileValue.Circle ),
        ];
        const smallBoardCircleWins = [
            getTile( 0, 0, TileValue.Cross ),
            getTile( 0, 1, TileValue.Circle ),
            getTile( 0, 2, TileValue.Empty ),

            getTile( 1, 0, TileValue.Empty ),
            getTile( 1, 1, TileValue.Cross ),
            getTile( 1, 2, TileValue.Cross ),

            getTile( 2, 0, TileValue.Circle ),
            getTile( 2, 1, TileValue.Circle ),
            getTile( 2, 2, TileValue.Circle ),
        ];
        const smallBoardNoOneWinsNotFinished = [
            getTile( 0, 0, TileValue.Empty ),
            getTile( 0, 1, TileValue.Empty ),
            getTile( 0, 2, TileValue.Circle ),

            getTile( 1, 0, TileValue.Empty),
            getTile( 1, 1, TileValue.Empty ),
            getTile( 1, 2, TileValue.Cross),

            getTile( 2, 0, TileValue.Cross ),
            getTile( 2, 1, TileValue.Circle ),
            getTile( 2, 2, TileValue.Cross ),
        ];
        const smallBoardNoOneWinsDraw = [
            getTile( 0, 0, TileValue.Cross ),
            getTile( 0, 1, TileValue.Cross ),
            getTile( 0, 2, TileValue.Circle ),

            getTile( 1, 0, TileValue.Circle),
            getTile( 1, 1, TileValue.Circle ),
            getTile( 1, 2, TileValue.Cross),

            getTile( 2, 0, TileValue.Cross ),
            getTile( 2, 1, TileValue.Circle ),
            getTile( 2, 2, TileValue.Cross ),
        ];
        const smallBoardNoOneWinsEmpty = [
            getTile( 0, 0, TileValue.Empty ),
            getTile( 0, 1, TileValue.Empty ),
            getTile( 0, 2, TileValue.Empty ),

            getTile( 1, 0, TileValue.Empty),
            getTile( 1, 1, TileValue.Empty ),
            getTile( 1, 2, TileValue.Empty),

            getTile( 2, 0, TileValue.Empty ),
            getTile( 2, 1, TileValue.Empty ),
            getTile( 2, 2, TileValue.Empty ),
        ];

        let bigBoard: Tile[] = [];

        const pushAllInside = (whereToPush: Tile[], elements: Tile[], bigBoardPoint: Point) => {
            elements.forEach((el) => {
                el.bigBoardPoint = bigBoardPoint;
                whereToPush.push(el);
            });
            return whereToPush;
        };

        bigBoard = pushAllInside(bigBoard, copyArray(smallBoardNoOneWinsNotFinished), {x: 0, y: 0});
        bigBoard = pushAllInside(bigBoard, copyArray(smallBoardCircleWins), {x: 0, y: 1});
        bigBoard = pushAllInside(bigBoard, copyArray(smallBoardNoOneWinsNotFinished), {x: 0, y: 2});
        bigBoard = pushAllInside(bigBoard, copyArray(smallBoardNoOneWinsEmpty), {x: 1, y: 0});
        bigBoard = pushAllInside(bigBoard, copyArray(smallBoardCircleWins), {x: 1, y: 1});
        bigBoard = pushAllInside(bigBoard, copyArray(smallBoardCrossWins), {x: 1, y: 2});
        bigBoard = pushAllInside(bigBoard, copyArray(smallBoardCrossWins2), {x: 2, y: 0});
        bigBoard = pushAllInside(bigBoard, copyArray(smallBoardCrossWins), {x: 2, y: 1});
        const input = pushAllInside(bigBoard, copyArray(smallBoardNoOneWinsDraw), {x: 2, y: 2});

        const expectedResult = [
            getTile( 0, 0, TileValue.Empty ),
            getTile( 0, 1, TileValue.Circle ),
            getTile( 0, 2, TileValue.Empty ),

            getTile( 1, 0, TileValue.Empty),
            getTile( 1, 1, TileValue.Circle ),
            getTile( 1, 2, TileValue.Cross),

            getTile( 2, 0, TileValue.Cross ),
            getTile( 2, 1, TileValue.Cross ),
            getTile( 2, 2, TileValue.Destroyed ),
        ];
        expectedResult.forEach((el) => {
            el.bigBoardPoint.x = el.smallBoardPoint.x;
            el.bigBoardPoint.y = el.smallBoardPoint.y;
        });

        const actualResult = reduceEachSmallBoardToOneValue(input);

        expect(actualResult).toEqual(expectedResult);
    });
});