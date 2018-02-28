import { cloneState, TileInformation, TileValue } from '../state/AppState';
import { getSmallBoard } from './GetSmallBoard';
import { getWinResult } from './CheckBoard';
import { playerToTileValue } from './PlayerToTile';
import { arePointsEqual } from './Point';

export const reduceEachSmallBoardToOneValue = ( completeBoard: TileInformation[] ) => {

    let newBoard = cloneState(completeBoard ) ;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const smallBoard = getSmallBoard( completeBoard, {x: i, y: j} );
            const winResult = getWinResult( smallBoard );

            const isBoardFull = smallBoard.filter( ( el ) => el.value === TileValue.Empty ).length === 0;
            const tileValue = playerToTileValue( winResult.winningPlayer!, isBoardFull );
            const newTile: TileInformation = {
                bigBoardPoint: {x: i, y: j},
                smallBoardPoint: {x: i, y: j},
                value: tileValue,
            };

            newBoard = newBoard.filter( ( el: TileInformation ) => !arePointsEqual( el.bigBoardPoint, {x: i, y: j} ) );
            newBoard.push( newTile );
        }
    }

    return newBoard;
};