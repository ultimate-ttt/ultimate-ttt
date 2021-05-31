import * as React from 'react';
import { BigBoard } from '../../Board/BigBoard/BigBoard';
import { HowToPlayBoardState } from '../../../state/AppState';

interface HowToPlayContentProps {
  boardState: HowToPlayBoardState;
}

export function HowToPlayContent(props: HowToPlayContentProps) {
  const { boardState } = props;
  return (
    <BigBoard
      animate={boardState.animate}
      currentPlayer={boardState.currentPlayer}
      board={boardState.board}
      activeBoards={boardState.activeBoards}
    />
  );
}
