import * as React from 'react';
import { TicTacToeGame } from '../../../util';
import { BigBoard } from '../../Board/BigBoard/BigBoard';

interface HowToPlayContentProps {
  board: TicTacToeGame;
}

export function HowToPlayContent(props: HowToPlayContentProps) {
  const { board } = props;
  return (
    <BigBoard
      currentPlayer={board.getCurrentPlayer()}
      board={board.getBoard()}
      activeBoards={board.getCurrentActiveBoards()}
      animate={true}
    />
  );
}
