import * as React from 'react';
import { default as TileContainer } from '../Tile/TileContainer';
import { Point } from '../../../util/Point';
import { Player } from '../../../state/AppState';
import { playerToTileValue } from '../../../util/PlayerToTile';
import './smallboard.css';

interface SmallBoardProps {
    x: number;
    y: number;
    isFinished?: boolean;
    winningPlayer?: Player;
}

interface SmallBoardState {

}

export class SmallBoard extends React.Component<SmallBoardProps, SmallBoardState> {

    constructor( props: SmallBoardProps ) {
        super( props );

        this.createTiles = this.createTiles.bind( this );
    }

    getUnfinishedTileContainer( x: number, y: number, bigBoardPoint: Point ) {
        return (
            <TileContainer
                key={x.toString() + y.toString()}
                smallBoardPoint={{x, y}}
                bigBoardPoint={bigBoardPoint}
            />
        );
    }

    getFinishedTileContainer( bigBoardPoint: Point, winningPlayer: Player ) {
        return (
            <TileContainer
                key={1}
                bigBoardPoint={bigBoardPoint}
                value={playerToTileValue( winningPlayer, true )}
                isSmallBoardFinished={true}
            />
        );
    }

    getUnfinishedSmallBoard( bigBoardPoint: Point ) {
        let rows = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                rows.push( this.getUnfinishedTileContainer( i, j, bigBoardPoint ) );
            }
        }
        return rows;
    }

    createTiles() {
        const {x, y, isFinished, winningPlayer} = this.props;
        const bigBoardPoint: Point = {x: x, y: y};

        let rows = [];
        if (!isFinished) {
            rows = this.getUnfinishedSmallBoard( bigBoardPoint );
        } else {
            rows.push( this.getFinishedTileContainer( bigBoardPoint, winningPlayer! ) );
        }

        return rows;
    }

    render() {
        const tiles = this.createTiles();
        const smallBoardClassName = this.props.isFinished ? 'small-board-finished' : 'small-board';
        // TODO: Don't construct Tiles myself but get them from State?

        return (
            <div className={smallBoardClassName}>
                {tiles}
            </div>
        );
    }
}