import { isMoveAllowed } from '../MoveAllowed';

describe( 'isMoveAllowed', () => {

    const basicTestCasesReturnFalse = [
        {
            nextBigBoardPoint: {x: 0, y: 2},
            lastSmallBoardPoint: {x: 0, y: 0},
            isCurrentSmallBoardFinished: false,
            isSmallBoardLastMovePointsToFinished: false,
            isBigBoardFinished: false,
        },
        {
            nextBigBoardPoint: {x: 1, y: 2},
            lastSmallBoardPoint: {x: 2, y: 1},
            isCurrentSmallBoardFinished: false,
            isSmallBoardLastMovePointsToFinished: false,
            isBigBoardFinished: false,
        },
        {
            nextBigBoardPoint: {x: 2, y: 0},
            lastSmallBoardPoint: {x: 2, y: 1},
            isCurrentSmallBoardFinished: false,
            isSmallBoardLastMovePointsToFinished: false,
            isBigBoardFinished: false,
        },
        {
            nextBigBoardPoint: {x: 1, y: 1},
            lastSmallBoardPoint: {x: 1, y: 0},
            isCurrentSmallBoardFinished: false,
            isSmallBoardLastMovePointsToFinished: false,
            isBigBoardFinished: false,
        },
    ];

    basicTestCasesReturnFalse.forEach( ( testCase, index ) => {
        it( `should return false when current move is different tile than last move points to #${index}`, () => {
            const result = isMoveAllowed( testCase.nextBigBoardPoint, testCase.lastSmallBoardPoint,
                                          testCase.isCurrentSmallBoardFinished,
                                          testCase.isSmallBoardLastMovePointsToFinished,
                                          testCase.isBigBoardFinished);
            expect( result ).toEqual( false );
        } );
    } );

    const basicTestCasesReturnTrue = [
        {
            nextBigBoardPoint: {x: 1, y: 1},
            lastSmallBoardPoint: {x: 1, y: 1},
            isCurrentSmallBoardFinished: false,
            isSmallBoardLastMovePointsToFinished: false,
            isBigBoardFinished: false,
        },
        {
            nextBigBoardPoint: {x: 2, y: 2},
            lastSmallBoardPoint: {x: 2, y: 2},
            isCurrentSmallBoardFinished: false,
            isSmallBoardLastMovePointsToFinished: false,
            isBigBoardFinished: false,
        },
        {
            nextBigBoardPoint: {x: 1, y: 2},
            lastSmallBoardPoint: {x: 1, y: 2},
            isCurrentSmallBoardFinished: false,
            isSmallBoardLastMovePointsToFinished: false,
            isBigBoardFinished: false,
        },
        {
            nextBigBoardPoint: {x: 0, y: 2},
            lastSmallBoardPoint: {x: 0, y: 2},
            isCurrentSmallBoardFinished: false,
            isSmallBoardLastMovePointsToFinished: false,
            isBigBoardFinished: false,
        },
    ];

    basicTestCasesReturnTrue.forEach( ( testCase, index ) => {
        it( `should return true when current move is the same tile as the one the last move points to #${index}`,
            () => {
                const result = isMoveAllowed( testCase.nextBigBoardPoint, testCase.lastSmallBoardPoint,
                                              testCase.isCurrentSmallBoardFinished,
                                              testCase.isSmallBoardLastMovePointsToFinished,
                                              testCase.isBigBoardFinished
                                               );
                expect( result ).toEqual( true );
            } );
    } );

    const boardsFinishedTestsReturnFalse = [
        {
            nextBigBoardPoint: {x: 2, y: 2},
            lastSmallBoardPoint: {x: 2, y: 2},
            isCurrentSmallBoardFinished: true,
            isSmallBoardLastMovePointsToFinished: true,
            isBigBoardFinished: false,
        },
        {
            nextBigBoardPoint: {x: 1, y: 2},
            lastSmallBoardPoint: {x: 1, y: 2},
            isCurrentSmallBoardFinished: true,
            isSmallBoardLastMovePointsToFinished: true,
            isBigBoardFinished: false,
        },
    ];

    boardsFinishedTestsReturnFalse.forEach( ( testCase, index ) => {
        it( `should return false when the current small board is finished #${index}`,
            () => {
                const result = isMoveAllowed( testCase.nextBigBoardPoint, testCase.lastSmallBoardPoint,
                                              testCase.isCurrentSmallBoardFinished,
                                              testCase.isSmallBoardLastMovePointsToFinished,
                                              testCase.isBigBoardFinished
                                              );
                expect( result ).toEqual( false );
            } );
    } );

    const boardsFinishedTestsReturnTrue = [
        {
            nextBigBoardPoint: {x: 0, y: 0},
            lastSmallBoardPoint: {x: 1, y: 0},
            isCurrentSmallBoardFinished: false,
            isSmallBoardLastMovePointsToFinished: true,
            isBigBoardFinished: false,
        },
        {
            nextBigBoardPoint: {x: 2, y: 0},
            lastSmallBoardPoint: {x: 0, y: 2},
            isCurrentSmallBoardFinished: false,
            isSmallBoardLastMovePointsToFinished: true,
            isBigBoardFinished: false,
        }
    ];

    boardsFinishedTestsReturnTrue.forEach( ( testCase, index ) => {
        it( `should return true when trying to addSymbol to smallBoard that ` +
            `is not finished but coordinates are different because lastMove points` +
            `to a small board that is finished #${index}`,
            () => {
                const result = isMoveAllowed( testCase.nextBigBoardPoint, testCase.lastSmallBoardPoint,
                                              testCase.isCurrentSmallBoardFinished,
                                              testCase.isSmallBoardLastMovePointsToFinished,
                                              testCase.isBigBoardFinished);
                expect( result ).toEqual( true );
            } );
    } );

    const bigBoardFinishedTestsReturnFalse = [
        {
            nextBigBoardPoint: {x: 0, y: 0},
            lastSmallBoardPoint: {x: 1, y: 0},
            isCurrentSmallBoardFinished: false,
            isSmallBoardLastMovePointsToFinished: true,
            isBigBoardFinished: true,
        },
        {
            nextBigBoardPoint: {x: 2, y: 0},
            lastSmallBoardPoint: {x: 0, y: 2},
            isCurrentSmallBoardFinished: false,
            isSmallBoardLastMovePointsToFinished: true,
            isBigBoardFinished: true,
        },
        {
            nextBigBoardPoint: {x: 1, y: 1},
            lastSmallBoardPoint: {x: 1, y: 1},
            isCurrentSmallBoardFinished: false,
            isSmallBoardLastMovePointsToFinished: false,
            isBigBoardFinished: true,
        },
        {
            nextBigBoardPoint: {x: 1, y: 2},
            lastSmallBoardPoint: {x: 1, y: 2},
            isCurrentSmallBoardFinished: false,
            isSmallBoardLastMovePointsToFinished: false,
            isBigBoardFinished: true,
        },
    ];

    bigBoardFinishedTestsReturnFalse.forEach( ( testCase, index ) => {
        it( `should return false when trying to addSymbol to smallBoard when bigBoard is already finished #${index}`,
            () => {
                const result = isMoveAllowed( testCase.nextBigBoardPoint, testCase.lastSmallBoardPoint,
                                              testCase.isCurrentSmallBoardFinished,
                                              testCase.isSmallBoardLastMovePointsToFinished,
                                              testCase.isBigBoardFinished
                                              );
                expect( result ).toEqual( false );
            } );
    } );

} );