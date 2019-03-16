import * as React from 'react';
import { SmallBoard } from '../SmallBoard/SmallBoard';
import { AppState, Player, SmallBoardInformation } from '../../../state/AppState';

import './bigboard.css';
import { arePointsEqual } from '../../../util';
import { Point } from '../../../util/Point';
import { connect } from 'react-redux';
import { playerMoved } from '../../../state/currentGame/game/gameAction';

interface BigBoardProps {
    currentPlayer: Player;
    board: SmallBoardInformation[];
    activeBoards: Point[];
    onPlayerMoved: ( boardX: number, boardY: number, tileX: number, tileY: number ) => void;
    analysisMode?: boolean;
}

export class BigBoard extends React.Component<BigBoardProps> {

    constructor( props: BigBoardProps ) {
        super( props );

        this.createSmallBoards = this.createSmallBoards.bind( this );
        this.isMoveOnBoardAllowed = this.isMoveOnBoardAllowed.bind( this );
    }

    isMoveOnBoardAllowed( x: number, y: number, activeBoards: Point[] ) {
        if (!activeBoards) {
            return false;
        }

        const theBoardPlayedOnIsActive = activeBoards.some( board => arePointsEqual( {x, y}, board ) );
        return theBoardPlayedOnIsActive;
    }

    createSmallBoards() {
        const {currentPlayer, board, activeBoards, onPlayerMoved, analysisMode} = this.props;
        const rows = [];

        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {

                const smallBoard = board.find( tile => arePointsEqual( tile.position, {x, y} ) );

                if (smallBoard) {
                    const isMoveAllowed = this.isMoveOnBoardAllowed( x, y, activeBoards );

                    let onTileClicked;
                    if (analysisMode) {
                        // tslint:disable-next-line
                        onTileClicked = ( tileX: number, tileY: number ) => {
                        };
                    } else {
                        onTileClicked = ( tileX: number, tileY: number ) => {
                            onPlayerMoved( x, y, tileX, tileY );
                        };
                    }

                    rows.push(
                        <SmallBoard
                            key={`x: ${x}/ Y: ${y}`}
                            x={x}
                            y={y}
                            isMoveAllowed={isMoveAllowed}
                            currentPlayer={currentPlayer}
                            tiles={smallBoard.tiles}
                            winningPlayer={smallBoard.value}
                            onTileClicked={onTileClicked}
                        />
                    );
                }
            }
        }

        return rows;
    }

    render() {
        return (
            <div className="big-board">
                {this.createSmallBoards()}
            </div>
        );
    }
}

const mapStateToProps = ( state: AppState ) => ({
    currentPlayer: state.game.currentPlayer,
    board: state.board,
    activeBoards: state.activeBoards,
});

// tslint:disable-next-line: no-any
const mapDispatchToProps = ( dispatch: any ) => ({
    onPlayerMoved: ( boardX: number, boardY: number, tileX: number, tileY: number ) =>
        dispatch( playerMoved( {x: boardX, y: boardY}, {x: tileX, y: tileY} ) )
});

export default connect( mapStateToProps, mapDispatchToProps )( BigBoard );
