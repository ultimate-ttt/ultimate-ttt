import { Tile, TileValue } from '../../state/AppState';
import { getSmallBoard } from '../GetSmallBoard';

const getTile = ( boardX: number, boardY: number, value: TileValue ) => {
    return {
        bigBoardPoint: {x: -1, y: -1},
        smallBoardPoint: {x: boardX, y: boardY},
        value: value
    };
};

describe( 'getSmallBoard', function () {
    it('should return the right 9 tiles from the big board', () => {
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
        smallBoardCrossWins.forEach((el) => el.bigBoardPoint = {x: 0, y: 0});
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
        smallBoardCircleWins.forEach((el) => el.bigBoardPoint = {x: 0, y: 1});

        let bigBoard: Tile[] = [];
        smallBoardCircleWins.forEach((el) => bigBoard.push(el));
        smallBoardCrossWins.forEach((el) => bigBoard.push(el));

        const expectedResult = [
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
        expectedResult.forEach((el) => el.bigBoardPoint = {x: 0, y: 1});

        const actualResult = getSmallBoard(bigBoard, {x: 0, y: 1});
        expect(actualResult).toEqual(expectedResult);

    });
} );