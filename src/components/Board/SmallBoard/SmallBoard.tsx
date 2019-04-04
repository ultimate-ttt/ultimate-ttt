import * as React from 'react';
import {
  MarkSpecially,
  Player,
  SmallTileInformation,
  TileValue,
} from '../../../state/AppState';
import './smallboard.css';
import { Tile } from '../Tile/Tile';
import { arePointsEqual, Point } from '../../../util/Point';

interface SmallBoardProps {
  x: number;
  y: number;
  isMoveAllowed: boolean;
  currentPlayer: Player; // the Player who will play next
  winningPlayer: TileValue; // the Player who have won this Board or null if no one has won
  tiles: SmallTileInformation[];
  onTileClicked: (x: number, y: number) => void;
  markTileSpecially?: MarkSpecially;
}

export class SmallBoard extends React.Component<SmallBoardProps> {
  getTiles = (
    tiles: SmallTileInformation[],
    isCircle: boolean,
    isMoveAllowed: boolean,
    onTileClicked: (x: number, y: number) => void,
  ) => {
    const { markTileSpecially } = this.props;
    const rows: JSX.Element[] = [];

    tiles.forEach((tile) => {
      rows.push(
        <Tile
          key={`${tile.position.x}-${tile.position.y}`}
          value={tile.value}
          isTileRound={isCircle}
          isClickable={isMoveAllowed && tile.value === TileValue.Empty}
          onTileClicked={() => {
            onTileClicked(tile.position.x, tile.position.y);
          }}
          markSpecially={this.getMarkSpecially(
            markTileSpecially,
            tile.position,
          )}
        />,
      );
    });

    return rows;
  };

  getMarkSpecially = (
    markSpecially: MarkSpecially | undefined,
    point: Point,
  ) => {
    if (markSpecially === undefined) {
      return undefined;
    }

    if (markSpecially.condition && markSpecially.position) {
      if (arePointsEqual(point, markSpecially.position.tilePosition)) {
        return true;
      }
    }

    return false;
  };

  render() {
    const {
      x,
      y,
      winningPlayer,
      currentPlayer,
      tiles,
      isMoveAllowed,
      onTileClicked,
      markTileSpecially,
    } = this.props;

    const boardIsFinished = winningPlayer !== TileValue.Empty;
    if (boardIsFinished) {
      return (
        <div key={`Small-Board-${x},${y}`} className="small-board-finished">
          <Tile
            value={winningPlayer}
            isTileRound={winningPlayer === TileValue.Circle}
            isClickable={false}
            isBig={true}
            markSpecially={this.getMarkSpecially(
              markTileSpecially,
              markTileSpecially && markTileSpecially.position
                ? markTileSpecially.position.tilePosition
                : { x, y },
            )}
          />
        </div>
      );
    }

    const isCircle = currentPlayer === Player.Circle;
    return (
      <div className="small-board">
        {this.getTiles(tiles, isCircle, isMoveAllowed, onTileClicked)}
      </div>
    );
  }
}
