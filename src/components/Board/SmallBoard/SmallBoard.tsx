import * as React from 'react';
import {
  Player,
  SmallTileInformation,
  TileValue,
  Highlight,
} from '../../../state/AppState';
import { Tile } from '../Tile/Tile';
import { arePointsEqual, Point } from '../../../util';
import styles from './SmallBoard.module.css';

export interface SmallBoardProps {
  x: number;
  y: number;
  moveAllowed: boolean;
  currentPlayer: Player;
  winningPlayer: TileValue;
  tiles: SmallTileInformation[];
  onTileClicked?: (x: number, y: number) => void;
  highlight?: Highlight;
  animate?: boolean;
}

const shouldHighlight = (highlight: Highlight | undefined, point: Point) => {
  if (highlight === undefined) {
    return undefined;
  }

  if (highlight.condition && highlight.position) {
    if (arePointsEqual(point, highlight.position.tilePosition)) {
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
    highlight,
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
          highlight={shouldHighlight(highlight, tile.position)}
          {...(onTileClicked && {
            onTileClicked: () => {
              onTileClicked(tile.position.x, tile.position.y);
            },
          })}
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
          highlight={shouldHighlight(
            highlight,
            highlight && highlight.position
              ? highlight.position.tilePosition
              : { x, y },
          )}
        />
      ) : (
        getTiles()
      )}
    </div>
  );
}
