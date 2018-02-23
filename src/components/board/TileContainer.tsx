import { changePlayer } from '../../state/game/gameAction';
import { registerMove } from '../../state/moves/moveAction';
import { Point } from '../../util/Point';
import { isMoveAllowed } from '../../util/MoveAllowed';
import { arePointsEqual } from '../../util/Point';
import { Tile as StateTile, Move, Player, TileValue, AppState } from '../../state/AppState';
import { addSymbol } from '../../state/tiles/tileAction';
import { connect } from 'react-redux';
import { Tile } from './Tile';
import { getSmallBoard } from '../../util/GetSmallBoard';
import { getWinResult } from '../../util/CheckBoard';
import { batchActions } from 'redux-batched-actions';
import { reduceEachSmallBoardToOneValue } from '../../util/ReduceBoard';

const getTileValue = ( tiles: StateTile[], bigBoardPoint: Point, smallBoardPoint: Point ) => {
    const index = tiles.findIndex( ( tile ) => {
        return arePointsEqual( tile.bigBoardPoint, bigBoardPoint )
            && arePointsEqual( tile.smallBoardPoint, smallBoardPoint );
    } );
    return tiles[index].value;
};

const getLastSmallBoardPoint =
    ( moves: Move[] ) => {
        const lastMove = moves[moves.length - 1];
        if (lastMove) {
            return lastMove.smallBoardPoint;
        }
        return {x: -1, y: -1};
    };

const isSmallBoardFinished = ( smallBoard: StateTile[] ) => {
    const winResult = getWinResult( smallBoard );
    return winResult.isFinished;
};

const mapStateToProps = ( state: AppState, ownProps: any ) => {

    const lastSmallBoardPoint = getLastSmallBoardPoint( state.moves );
    const smallBoardLastMovePointsTo = getSmallBoard( state.tiles, lastSmallBoardPoint );
    const isSmallBoardLastMovePointsToFinished = isSmallBoardFinished( smallBoardLastMovePointsTo );

    const isBigBoardFinished = getWinResult( reduceEachSmallBoardToOneValue( state.tiles ) ).isFinished;

    if (!ownProps.isSmallBoardFinished) {
        return {
            value: getTileValue( state.tiles, ownProps.bigBoardPoint, ownProps.smallBoardPoint ),
            player: state.game.currentPlayer,
            shouldDisplayIndicator: isMoveAllowed( ownProps.bigBoardPoint, lastSmallBoardPoint,
                                                   ownProps.isSmallBoardFinished, isSmallBoardLastMovePointsToFinished,
                                                   isBigBoardFinished )
        };
    }
    return {};
};

const mapDispatchToProps = ( dispatch: Function ) => {
    return {
        onTileClicked: ( bigBoardPoint: Point, smallBoardPoint: Point,
                         player: Player, tileValue: TileValue, moveAllowed: boolean ) => {

            if (tileValue === TileValue.Empty && moveAllowed) {

                dispatch( batchActions( [addSymbol( bigBoardPoint, smallBoardPoint, player ),
                                            changePlayer(),
                                            registerMove( bigBoardPoint, smallBoardPoint, player )]
                ) );

            }
        }
    };
};

// TODO find out Type for connect?
export default connect<any>( mapStateToProps, mapDispatchToProps )( Tile );