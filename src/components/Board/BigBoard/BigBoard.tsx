import * as React from 'react';
import { SmallBoard } from '../SmallBoard/SmallBoard';
import {
  Highlight,
  Player,
  SmallBoardInformation,
} from '../../../state/AppState';
import { arePointsEqual, Point } from '../../../util';
import styles from './BigBoard.module.css';
import { useEffect, useRef } from 'react';

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
  if (!activeBoards) {
    return false;
  }

  const theBoardPlayedOnIsActive = activeBoards.some((board) =>
    arePointsEqual({ x, y }, board),
  );
  return theBoardPlayedOnIsActive;
};

export function BigBoard(props: BigBoardProps) {
  // TODO when changing the step in HowToPlay the first animation is still applied... investigate!
  const isFirstRef = useRef(true);
  useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false;
    }
  }, [isFirstRef]);

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
              animate={!isFirstRef.current && animate}
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
