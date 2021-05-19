import * as React from 'react';
import { TicTacToeGame } from '../../../../util';
import { useEffect, useState } from 'react';
import { HowToPlayContent } from '../HowToPlayContent';

export interface StepWithBoardsProps {
  boards: TicTacToeGame[];
}

export function StepWithBoards(props: StepWithBoardsProps) {
  const [boardNumber, setBoardNumber] = useState(0);
  const { boards } = props;

  useEffect(() => {
    if (boards.length <= 1) {
      return;
    }

    let updateInterval = setInterval(() => {
      setBoardNumber(boards.length - 1 > boardNumber ? boardNumber + 1 : 0);
    }, 1000);

    return () => clearInterval(updateInterval);
  }, [boards, boardNumber]);

  const currentBoard = boards[boardNumber];
  return <HowToPlayContent board={currentBoard} />;
}
