import * as React from 'react';
import { HowToPlayBoardState } from '../../state/AppState';
import { BigBoard } from '../../components/Board/BigBoard/BigBoard';

interface HowToPlayContentProps {
  boardState: HowToPlayBoardState;
}

export function HowToPlayContent({ boardState }: HowToPlayContentProps) {
  return (
    <BigBoard
      animate={boardState.animate}
      currentPlayer={boardState.currentPlayer}
      board={boardState.board}
      activeBoards={boardState.activeBoards}
    />
  );
}
