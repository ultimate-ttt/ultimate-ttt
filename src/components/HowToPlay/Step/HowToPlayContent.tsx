import * as React from 'react';
import { Point } from '../../../util';
import { BigBoard } from '../../Board/BigBoard/BigBoard';
import { Player, SmallBoardInformation } from '../../../state/AppState';

interface HowToPlayContentProps {
  animate: boolean;
  board: SmallBoardInformation[];
  currentPlayer: Player;
  activeBoards: Point[];
}

export function HowToPlayContent(props: HowToPlayContentProps) {
  const { animate, board, currentPlayer, activeBoards } = props;
  return (
    <BigBoard
      animate={animate}
      currentPlayer={currentPlayer}
      board={board}
      activeBoards={activeBoards}
    />
  );
}
