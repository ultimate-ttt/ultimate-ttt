import * as React from 'react';
import { default as TileContainer } from './Tile/TileContainer';
import { Point } from '../../util/Point';
import { Player } from '../../state/AppState';
import { playerToTileValue } from '../../util/PlayerToTile';

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

    createTiles() {
        const {x, y, isFinished, winningPlayer} = this.props;
        const bigBoardPoint: Point = {x: x, y: y};

        let rows = [];
        if (!isFinished) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    rows.push( (
                        <TileContainer
                            key={i.toString() + j.toString()}
                            smallBoardPoint={{x: i, y: j}}
                            bigBoardPoint={bigBoardPoint}
                        />
                    ) );
                }
            }
        } else {
            rows.push( (
                <TileContainer
                    key={1}
                    bigBoardPoint={bigBoardPoint}
                    value={playerToTileValue( winningPlayer!, true )}
                    isSmallBoardFinished={true}
                />
            ) );
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