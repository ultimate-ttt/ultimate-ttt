import * as React from 'react';
import { SmallBoard } from '../SmallBoard/SmallBoard';
import { AppState, Player, TileInformation, TileValue } from '../../../state/AppState';

import './bigboard.css';
import { arePointsEqual } from '../../../util';
import { Point } from '../../../util/Point';
import { connect } from 'react-redux';
import { playerMoved } from '../../../state/game/gameAction';

interface BigBoardProps {
    currentPlayer: Player;
    allTiles: TileInformation[];
    activeBoards: Point[];
    onPlayerMoved: ( boardX: number, boardY: number, tileX: number, tileY: number ) => void;
}

interface BigBoardState {
}

export class BigBoard extends React.Component<BigBoardProps, BigBoardState> {

    constructor( props: BigBoardProps ) {
        super( props );

        this.createSmallBoards = this.createSmallBoards.bind( this );
        this.isBoardActive = this.isBoardActive.bind( this );
    }

    isBoardActive( x: number, y: number, activeBoards: Point[] ) {

        if (!activeBoards) {
            return false;
        }
        let isActive = false;

        activeBoards.forEach( board => {
            if (arePointsEqual( {x, y}, board )) {
                isActive = true;
            }
        } );

        return isActive;
    }

    createSmallBoards() {
        const {currentPlayer, allTiles, activeBoards, onPlayerMoved} = this.props;
        const rows = [];

        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {

                const tiles = allTiles.filter( t => arePointsEqual( t.bigBoardPoint, {x, y} ) );
                let isActive = this.isBoardActive( x, y, activeBoards );

                rows.push(
                    <SmallBoard
                        key={`x: ${x}/ Y: ${y}`}
                        x={x}
                        y={y}
                        isActive={isActive}
                        currentPlayer={currentPlayer}
                        tiles={tiles}
                        winningPlayer={TileValue.Circle} // TODO: use correct value
                        onTileClicked={
                            ( tileX: number, tileY: number ) => {
                                onPlayerMoved( x, y, tileX, tileY );
                            }
                        }
                    />
                );
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
    allTiles: state.tiles,
    activeBoards: state.activeBoards,
});

// tslint:disable-next-line: no-any
const mapDispatchToProps = ( dispatch: any ) => ({
    onPlayerMoved: ( boardX: number, boardY: number, tileX: number, tileY: number ) =>
        dispatch( playerMoved( {x: boardX, y: boardY}, {x: tileX, y: tileY} ) )
});

export default connect( mapStateToProps, mapDispatchToProps )( BigBoard );
