import * as React from 'react';
import { Move } from '../../../../state/AppState';
import { TicTacToeGame } from '../../../../util';
import { useEffect, useRef, useState } from 'react';
import { HowToPlayContent } from '../HowToPlayContent';

export interface StepWithMovesProps {
  initialBoard: TicTacToeGame;
  moves: Move[];
}

export function StepWithMoves(props: StepWithMovesProps) {
  const { moves } = props;
  // const isFirstRef = useRef(true); // On first render we don't want to animate the circle -> square change
  const [moveNumber, setMoveNumber] = useState(-1);
  const board = useRef(props.initialBoard);

  useEffect(() => {
    board.current = props.initialBoard;
    setMoveNumber(-1);
  }, [props]);

  useEffect(() => {
    if (moves.length === 0) {
      return;
    }

    // TODO it waits too long on the first open
    // TODO when clicking the backwards button at the right time, the state is not updated correctly
    // -> I think we should handle all this stuff (except for the setInterval) in redux, as this could make it a lot easier to finally solve!!!
    let updateInterval = setInterval(() => {
      const newMoveNumber = moves.length - 1 > moveNumber ? moveNumber + 1 : -1;
      setMoveNumber(newMoveNumber);

      board.current = new TicTacToeGame(props.initialBoard.getMoves());
      const movesToApply = moves.slice(0, moveNumber + 1);
      board.current.applyMoves(movesToApply);
    }, 1000);

    return () => clearInterval(updateInterval);
  }, [moveNumber, moves, props.initialBoard]);

  return <HowToPlayContent board={board.current} />;
}
