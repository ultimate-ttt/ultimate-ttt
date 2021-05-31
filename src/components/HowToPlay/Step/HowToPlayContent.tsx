import * as React from 'react';
import { Point } from '../../../util';
import { BigBoard } from '../../Board/BigBoard/BigBoard';
import { Player, SmallBoardInformation } from '../../../state/AppState';

interface HowToPlayContentProps {
  board: SmallBoardInformation[];
  currentPlayer: Player;
  activeBoards: Point[];
}

export function HowToPlayContent(props: HowToPlayContentProps) {
  const { board, currentPlayer, activeBoards } = props;
  return (
    <BigBoard
      currentPlayer={currentPlayer}
      board={board}
      activeBoards={activeBoards}
      animate={true}
    />
  );
}
