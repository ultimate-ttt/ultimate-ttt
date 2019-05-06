import * as React from 'react';
import {
  MarkSpecially,
  Player,
  SmallTileInformation,
  TileValue,
} from '../../../state/AppState';
import { Tile } from '../Tile/Tile';
import { arePointsEqual, Point } from '../../../util';
import styles from './SmallBoard.module.css';

interface SmallBoardProps {
  x: number;
  y: number;
  moveAllowed: boolean;
  currentPlayer: Player;
  winningPlayer: TileValue;
  tiles: SmallTileInformation[];
  onTileClicked?: (x: number, y: number) => void;
  markTileSpecially?: MarkSpecially;
  animate?: boolean;
}

const getMarkSpecially = (
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

export function SmallBoard(props: SmallBoardProps) {
  const {
    x,
    y,
    winningPlayer,
    currentPlayer,
    tiles,
    moveAllowed,
    onTileClicked,
    markTileSpecially,
    animate,
  } = props;

  const getTiles = () => {
    const rows: JSX.Element[] = [];

    tiles.forEach((tile) => {
      rows.push(
        <Tile
          key={`${tile.position.x}-${tile.position.y}`}
          position={{ tilePosition: tile.position, boardPosition: { x, y } }}
          value={tile.value}
          isTileRound={isCircle}
          clickable={moveAllowed && tile.value === TileValue.Empty}
          animate={animate}
          markSpecially={getMarkSpecially(markTileSpecially, tile.position)}
          {...onTileClicked && {
            onTileClicked: () => {
              onTileClicked(tile.position.x, tile.position.y);
            },
          }}
        />,
      );
    });

    return rows;
  };

  const boardIsFinished: boolean = winningPlayer !== TileValue.Empty;
  const isCircle = currentPlayer === Player.Circle;

  return (
    <div
      key={`Small-Board-${x},${y}`}
      className={
        boardIsFinished ? styles.smallBoardFinished : styles.smallBoard
      }
    >
      {boardIsFinished ? (
        <Tile
          position={{ tilePosition: { x: 0, y: 0 }, boardPosition: { x, y } }}
          value={winningPlayer}
          isTileRound={winningPlayer === TileValue.Circle}
          clickable={false}
          animate={animate}
          markSpecially={getMarkSpecially(
            markTileSpecially,
            markTileSpecially && markTileSpecially.position
              ? markTileSpecially.position.tilePosition
              : { x, y },
          )}
        />
      ) : (
        getTiles()
      )}
    </div>
  );
}
