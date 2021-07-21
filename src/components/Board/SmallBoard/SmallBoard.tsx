import * as React from 'react';
import {
  Highlight,
  Player,
  SmallTileInformation,
  TileValue,
} from '../../../state/AppState';
import { Tile } from '../Tile/Tile';
import { Point } from '../../../lib';
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
    if (Point.equal(point, highlight.position.tilePosition)) {
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
        tiles.map((tile) => (
          <Tile
            key={`${tile.position.x}-${tile.position.y}`}
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
          />
        ))
      )}
    </div>
  );
}
