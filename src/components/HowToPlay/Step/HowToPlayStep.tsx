import * as React from 'react';
import styles from './HowToPlayStep.module.css';
import { HowToPlayBoardState } from '../../../state/AppState';
import { HowToPlayContent } from './HowToPlayContent';

export interface HowToPlayStepProps {
  text: string;
  /*boardStates: TicTacToeGame[];
  moves: Move[];*/
  boardState: HowToPlayBoardState;
}

export function HowToPlayStep(props: HowToPlayStepProps) {
  // TODO: maybe add this change to the big board so that all HOC profit from this!
  /*
  const isFirstRef = useRef(true); // On first render we don't want to animate the circle -> square change
  const [boardNumber, setBoardNumber] = useState(0);
  const [moveNumber, setMoveNumber] = useState(-1);
  const [boards, setBoards] = useState(props.boardStates);
  const [moves, setMoves] = useState(props.moves);
  useEffect(() => {
    isFirstRef.current = true;
    setBoardNumber(0);
    setMoveNumber(-1);
    setBoards(props.boardStates);
    setMoves(props.moves);
  }, [props]);

  useEffect(() => {
    if (boards.length < 1 || (boards.length === 1 && moves.length === 0)) {
      return;
    }
    if (isFirstRef.current) {
      isFirstRef.current = false;
    }

    const updateBoard = () =>
      setBoardNumber(boards.length - 1 > boardNumber ? boardNumber + 1 : 0);
    const updateMove = () => {
      const newMoveNumber = moves.length - 1 > moveNumber ? moveNumber + 1 : -1;
      setMoveNumber(newMoveNumber);
      // TODO we should find a more straightforward implementation for this cycling!
      if (newMoveNumber === -1) {
        setBoards([props.boardStates[0]]);
        return;
      }
      const newBoard = new TicTacToeGame(boards[boardNumber].getMoves());
      newBoard.applyMove(moves[newMoveNumber]);
      setBoards([newBoard]);
    };

    let updateInterval = setTimeout(() => {
      if (moves.length === 0) {
        updateBoard();
      } else {
        updateMove();
      }
    }, 1000);

    return () => clearInterval(updateInterval);
  }, [boards, boardNumber, moves, moveNumber, props.boardStates]);

  const currentBoard = boards[boardNumber];
   */
  return (
    <>
      <p>{props.text}</p>
      <div className={styles.bigBoard}>
        <HowToPlayContent boardState={props.boardState} />
        {/*{props.boardStates.length === 1 ? (
          <StepWithMoves
            initialBoard={props.boardStates[0]}
            moves={props.moves}
          />
        ) : (
          <StepWithBoards boards={props.boardStates} />
        )}*/}

        {/*
        <BigBoard
          currentPlayer={currentBoard.getCurrentPlayer()}
          board={currentBoard.getBoard()}
          activeBoards={currentBoard.getCurrentActiveBoards()}
          animate={moves.length > 0 && !isFirstRef.current}
        />*/}
      </div>
    </>
  );
}
