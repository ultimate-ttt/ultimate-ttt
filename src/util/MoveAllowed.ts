import { Point } from './Point';

/**
 *
 * @param {Point} currentPointOnBigBoard
 * @param {Point} lastPointOnSmallBoard
 * @param {boolean} isCurrentSmallBoardFinished without current move
 * @param {boolean} isSmallBoardLastMovePointsToFinished
 * @returns {boolean}
 */
export const isMoveAllowed = ( currentPointOnBigBoard: Point,
                               lastPointOnSmallBoard: Point,
                               isCurrentSmallBoardFinished: boolean,
                               isSmallBoardLastMovePointsToFinished: boolean,
                               isBigBoardFinished: boolean ) => {

    const isBeginning = lastPointOnSmallBoard.x < 0 && lastPointOnSmallBoard.y < 0;
    const pointsAreEqual = currentPointOnBigBoard.x === lastPointOnSmallBoard.x
        && currentPointOnBigBoard.y === lastPointOnSmallBoard.y;

    if (isBigBoardFinished) {
        return false;
    } else if (isBeginning || (pointsAreEqual && !isCurrentSmallBoardFinished)) {
        return true;
    } else if (isSmallBoardLastMovePointsToFinished && !isCurrentSmallBoardFinished) {
        return true;
    } else {
        return false;
    }
};
