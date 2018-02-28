import * as React from 'react';
import { SmallBoard } from '../SmallBoard/SmallBoard';
import { AppState, Player, TileInformation } from '../../../state/AppState';

import './bigboard.css';
import { arePointsEqual } from '../../../util';
import { Point } from '../../../util/Point';
import { connect } from 'react-redux';

interface BigBoardProps {
    currentPlayer: Player;
    allTiles: TileInformation[];
    activeBoards: Point[];
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
        const {currentPlayer, allTiles, activeBoards} = this.props;
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
                        onTileClicked={
                            ( tileX: number, tileY: number ) => {
                                console.log( `Bigboard: ${x}/${y} => clickedTile ${tileX}/${tileY}` );
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
const mapDispatchToProps = ( dispatch: any ) => ({});

export default connect( mapStateToProps, mapDispatchToProps )( BigBoard );
