import * as React from 'react';
import { Player, SmallTileInformation, TileValue } from '../../../state/AppState';
import './smallboard.css';
import { Tile } from '../Tile/Tile';

interface SmallBoardProps {
    x: number;
    y: number;
    isMoveAllowed: boolean;
    currentPlayer: Player; // the Player who will play next
    winningPlayer: TileValue; // the Player who have won this Board or null if no one has won
    tiles: SmallTileInformation[];
    onTileClicked: ( x: number, y: number ) => void;
}

interface SmallBoardState {

}

export class SmallBoard extends React.Component<SmallBoardProps, SmallBoardState> {

    constructor( props: SmallBoardProps ) {
        super( props );

        this.getTiles = this.getTiles.bind( this );
    }

    getTiles( tiles: SmallTileInformation[],
              isCircle: boolean,
              isMoveAllowed: boolean,
              onTileClicked: ( x: number, y: number ) => void ) {
        const rows: JSX.Element[] = [];

        tiles.forEach( tile => {
            rows.push(
                <Tile
                    key={`${tile.position.x}-${tile.position.y}`}
                    value={tile.value}
                    isTileRound={isCircle}
                    isClickable={isMoveAllowed && tile.value === TileValue.Empty}
                    onTileClicked={() => {
                        onTileClicked( tile.position.x, tile.position.y );
                    }}
                />
            );
        } );

        return rows;
    }

    render() {
        const {x, y, winningPlayer, currentPlayer, tiles, isMoveAllowed, onTileClicked} = this.props;

        const boardIsFinished = winningPlayer !== TileValue.Empty;
        if (boardIsFinished) {
            return (
                <div key={`Small-Board-${x},${y}`} className="small-board-finished">
                    <Tile
                        value={winningPlayer}
                        isTileRound={winningPlayer === TileValue.Circle}
                        isClickable={false}
                        isBig={true}
                    />
                </div>
            );
        }

        const isCircle = currentPlayer === Player.Circle;
        return (
            <div className="small-board">
                {
                    this.getTiles(
                        tiles,
                        isCircle,
                        isMoveAllowed,
                        onTileClicked
                    )
                }
            </div>
        );

    }
}