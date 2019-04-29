import * as React from 'react';
import { SmallBoard } from '../SmallBoard/SmallBoard';
import {
  MarkSpecially,
  Player,
  SmallBoardInformation,
} from '../../../state/AppState';
import { arePointsEqual, Point } from '../../../util';
import styles from './BigBoard.module.css';

interface BigBoardProps {
  currentPlayer: Player;
  board: SmallBoardInformation[];
  activeBoards: Point[];
  onPlayerMoved?: (
    boardX: number,
    boardY: number,
    tileX: number,
    tileY: number,
  ) => void;
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
    if (arePointsEqual(point, markSpecially.position.boardPosition)) {
      return markSpecially;
    }
  }

  return { condition: false };
};

const isMoveOnBoardAllowed = (x: number, y: number, activeBoards: Point[]) => {
  if (!activeBoards) {
    return false;
  }

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
      markTileSpecially,
      animate,
    } = props;
    const rows = [];

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
              animate={animate}
              markTileSpecially={getMarkSpecially(markTileSpecially, {
                x,
                y,
              })}
              {...onPlayerMoved && {
                onTileClicked: (tileX: number, tileY: number) => {
                  onPlayerMoved(x, y, tileX, tileY);
                },
              }}
            />,
          );
        }
      }
    }

    return rows;
  };

  return <div className={styles.bigBoard}>{createSmallBoards()}</div>;
}
