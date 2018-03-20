import * as React from 'react';
import { Player, TileInformation, TileValue } from '../../../state/AppState';
import './smallboard.css';
import { Tile } from '../Tile/Tile';

interface SmallBoardProps {
    x: number;
    y: number;
    isActive: boolean; // is this the board where the next move will happen?
    currentPlayer: Player; // the Player who will play next
    winningPlayer: TileValue; // the Player who have won this Board or null if no one has won
    tiles: TileInformation[];
    onTileClicked: ( x: number, y: number ) => void;
}

interface SmallBoardState {

}

export class SmallBoard extends React.Component<SmallBoardProps, SmallBoardState> {

    constructor( props: SmallBoardProps ) {
        super( props );

        this.getTiles = this.getTiles.bind( this );
    }

    getTiles( tiles: TileInformation[],
              isCircle: boolean,
              isActive: boolean,
              onTileClicked: ( x: number, y: number ) => void ) {
        const rows: JSX.Element[] = [];

        tiles.forEach( tile => {
            rows.push(
                <Tile
                    key={`${tile.smallBoardPoint.x}-${tile.smallBoardPoint.y}`}
                    value={tile.value}
                    isCircle={isCircle}
                    isClickable={isActive && tile.value === TileValue.Empty}
                    onTileClicked={() => {
                        onTileClicked( tile.smallBoardPoint.x, tile.smallBoardPoint.y );
                    }}
                />
            );
        } );

        return rows;
    }

    render() {

        const {x, y, winningPlayer, currentPlayer, tiles, isActive, onTileClicked} = this.props;

        const isCircle = currentPlayer === Player.Circle;

        if (winningPlayer !== TileValue.Empty) {
            return (
                <div key={`Small-Board-${x},${y}`} className="small-board-finished">
                    <Tile
                        value={winningPlayer}
                        isCircle={winningPlayer === TileValue.Circle}
                        isClickable={false}
                    />
                </div>
            );
        }

        return (
            <div className="small-board">
                {
                    this.getTiles(
                        tiles,
                        isCircle,
                        isActive,
                        onTileClicked
                    )
                }
            </div>
        );

    }
}