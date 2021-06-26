import * as React from 'react';
import { SmallBoard } from '../SmallBoard/SmallBoard';
import {
  Highlight,
  Player,
  SmallBoardInformation,
  TileValue,
} from '../../../state/AppState';
import { arePointsEqual, Point } from '../../../lib';
import styles from './BigBoard.module.css';

export interface BigBoardProps {
  currentPlayer: Player;
  board: SmallBoardInformation[];
  activeBoards: Point[];
  onPlayerMoved?: (
    boardX: number,
    boardY: number,
    tileX: number,
    tileY: number,
  ) => void;
  highlight?: Highlight;
  animate?: boolean;
}

const shouldHighlight = (highlight: Highlight | undefined, point: Point) => {
  if (highlight === undefined) {
    return undefined;
  }

  if (highlight.condition && highlight.position) {
    if (arePointsEqual(point, highlight.position.boardPosition)) {
      return highlight;
    }
  }

  return { condition: false };
};

const isMoveOnBoardAllowed = (x: number, y: number, activeBoards: Point[]) => {
  const theBoardPlayedOnIsActive = activeBoards.some((board) =>
    arePointsEqual({ x, y }, board),
  );
  return theBoardPlayedOnIsActive;
};

export function BigBoard(props: BigBoardProps) {
  const createSmallBoards = () => {
    const {
      currentPlayer,
      board,
      activeBoards,
      onPlayerMoved,
      highlight,
      animate,
    } = props;
    const rows = [];
    const boardEmpty = board.every((sb) =>
      sb.tiles.every((t) => t.value === TileValue.Empty),
    );

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        const smallBoard = board.find((tile) =>
          arePointsEqual(tile.position, { x, y }),
        );

        if (smallBoard) {
          const isMoveAllowed = isMoveOnBoardAllowed(x, y, activeBoards);

          rows.push(
            <SmallBoard
              key={`x: ${x}/ Y: ${y}`}
              x={x}
              y={y}
              moveAllowed={isMoveAllowed}
              currentPlayer={currentPlayer}
              tiles={smallBoard.tiles}
              winningPlayer={smallBoard.value}
              animate={!boardEmpty && animate}
              highlight={shouldHighlight(highlight, {
                x,
                y,
              })}
              {...(onPlayerMoved && {
                onTileClicked: (tileX: number, tileY: number) => {
                  onPlayerMoved(x, y, tileX, tileY);
                },
              })}
            />,
          );
        }
      }
    }

    return rows;
  };

  return <div className={styles.bigBoard}>{createSmallBoards()}</div>;
}
