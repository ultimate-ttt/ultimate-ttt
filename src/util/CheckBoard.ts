import { Player, TileInformation, TileValue } from '../state/AppState';
import { playerToTileValue } from './PlayerToTile';

export interface WinResult {
    isFinished: boolean;
    winningPlayer: Player; // null if it is a draw
}

const countInLine = ( player: Player, row: TileInformation[] ) =>
    row.filter( el => el.value === playerToTileValue( player ) ).length;
const hasWonLine = ( player: Player, row: TileInformation[] ) => countInLine( player, row ) === 3;

const getWinResultForPlayer = ( player: Player, board: TileInformation[] ) => {
    return [
        {line: 'row0', won: hasWonLine( player, board.filter( el => el.smallBoardPoint.y === 0 ) )},
        {line: 'row1', won: hasWonLine( player, board.filter( el => el.smallBoardPoint.y === 1 ) )},
        {line: 'row2', won: hasWonLine( player, board.filter( el => el.smallBoardPoint.y === 2 ) )},
        {line: 'column0', won: hasWonLine( player, board.filter( el => el.smallBoardPoint.x === 0 ) )},
        {line: 'column1', won: hasWonLine( player, board.filter( el => el.smallBoardPoint.x === 1 ) )},
        {line: 'column2', won: hasWonLine( player, board.filter( el => el.smallBoardPoint.x === 2 ) )},
        {
            line: 'leftSlant',
            won: hasWonLine( player, board.filter( el => el.smallBoardPoint.x === el.smallBoardPoint.y ) )
        },
        {
            line: 'rightSlant',
            won: hasWonLine( player, board.filter( el => el.smallBoardPoint.x + el.smallBoardPoint.y === 2 ) )
        },
    ].reduce(
        ( answer, nextCheck ) => {
            return nextCheck.won ? nextCheck : answer;
        },
        {won: false} ).won;
};

// The method doesn't check if the input of the board is valid.
export const getWinResult = ( board: TileInformation[] ) => {
    const hasCrossWon = getWinResultForPlayer( Player.Cross, board );
    const hasCircleWon = getWinResultForPlayer( Player.Circle, board );
    const boardIsFull = board.every( ( element ) => { return element.value !== TileValue.Empty; } );

    if (hasCrossWon) {
        return {
            isFinished: true,
            winningPlayer: Player.Cross
        };
    } else if (hasCircleWon) {
        return {
            isFinished: true,
            winningPlayer: Player.Circle
        };
    } else if (boardIsFull) {
        return {
            isFinished: true,
            winningPlayer: null
        };
    } else {
        return {
            isFinished: false,
            winningPlayer: null
        };
    }
};