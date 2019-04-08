import * as React from 'react';
import { SmallBoard } from '../SmallBoard/SmallBoard';
import {
  MarkSpecially,
  Player,
  SmallBoardInformation,
} from '../../../state/AppState';
import { arePointsEqual } from '../../../util';
import { Point } from '../../../util/Point';
import './BigBoard.css';

interface BigBoardProps {
  currentPlayer: Player;
  board: SmallBoardInformation[];
  activeBoards: Point[];
  onPlayerMoved: (
    boardX: number,
    boardY: number,
    tileX: number,
    tileY: number,
  ) => void;
  markTileSpecially?: MarkSpecially;
}

export class BigBoard extends React.Component<BigBoardProps> {
  createSmallBoards = () => {
    const {
      currentPlayer,
      board,
      activeBoards,
      onPlayerMoved,
      markTileSpecially,
    } = this.props;
    const rows = [];

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        const smallBoard = board.find((tile) =>
          arePointsEqual(tile.position, { x, y }),
        );

        if (smallBoard) {
          const isMoveAllowed = this.isMoveOnBoardAllowed(x, y, activeBoards);

          rows.push(
            <SmallBoard
              key={`x: ${x}/ Y: ${y}`}
              x={x}
              y={y}
              isMoveAllowed={isMoveAllowed}
              currentPlayer={currentPlayer}
              tiles={smallBoard.tiles}
              winningPlayer={smallBoard.value}
              onTileClicked={(tileX: number, tileY: number) => {
                onPlayerMoved(x, y, tileX, tileY);
              }}
              markTileSpecially={this.getMarkSpecially(markTileSpecially, {
                x,
                y,
              })}
            />,
          );
        }
      }
    }

    return rows;
  };

  isMoveOnBoardAllowed = (x: number, y: number, activeBoards: Point[]) => {
    if (!activeBoards) {
      return false;
    }

    const theBoardPlayedOnIsActive = activeBoards.some((board) =>
      arePointsEqual({ x, y }, board),
    );
    return theBoardPlayedOnIsActive;
  };

  getMarkSpecially = (
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

  render() {
    return <div className="big-board">{this.createSmallBoards()}</div>;
  }
}
