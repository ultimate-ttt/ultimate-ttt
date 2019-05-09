import * as React from 'react';
import { BigBoard } from '../../../components/Board/BigBoard/BigBoard';
import { AnalysisGame } from '../../../state/AppState';
import { HistoryButtons } from '../../../components/Analysis/HistoryButtons/HistoryButtons';
import { MoveList } from '../../../components/Analysis/MoveList/MoveList';
import { scroller } from 'react-scroll/modules';
import { moveScrollElementBaseName } from '../../../components/Analysis/ScrollElementConstants';
import styles from './AnalysisGame.module.css';

interface AnalysisGameDisplayProps {
  moveForwardInHistory: (numberOfMoves: number) => void;
  moveBackwardInHistory: (numberOfMoves: number) => void;
  analysisGame: AnalysisGame;
}

function scrollToElement(moveNumberToScrollTo: number) {
  scroller.scrollTo(moveScrollElementBaseName + moveNumberToScrollTo, {
    duration: 300,
    smooth: true,
    containerId: 'moveList',
    // Thanks to this, when scrolling to an element, some elements above it will also be displayed
    offset: -125,
  });
}

export function AnalysisGameDisplay(props: AnalysisGameDisplayProps) {
  const analysisGame = props.analysisGame;
  const reversedMoves = analysisGame.moves.slice().reverse();
  const currentlyAppliedMove =
    reversedMoves[
      reversedMoves.findIndex((m) => m.moveNumber === analysisGame.currentMove)!
    ];

  return (
    <div className={styles.analysisLayout}>
      <div id="moveList" className={styles.moveList}>
        <MoveList
          currentMove={analysisGame.currentMove}
          reversedMoves={reversedMoves}
          moveForwardInHistory={props.moveForwardInHistory}
          moveBackwardInHistory={props.moveBackwardInHistory}
        />
      </div>
      <div className={styles.historyButtons}>
        <HistoryButtons
          currentMove={analysisGame.currentMove}
          lastMove={reversedMoves[0] && reversedMoves[0].moveNumber}
          moveForwardInHistory={props.moveForwardInHistory}
          moveBackwardInHistory={props.moveBackwardInHistory}
          onInteraction={scrollToElement}
        />
      </div>
      <div className={styles.analysisGame}>
        <BigBoard
          board={analysisGame.board}
          activeBoards={analysisGame.activeBoards}
          currentPlayer={analysisGame.game.currentPlayer}
          markTileSpecially={{
            condition: currentlyAppliedMove !== undefined,
            position: currentlyAppliedMove
              ? {
                  boardPosition: currentlyAppliedMove.boardPosition,
                  tilePosition: currentlyAppliedMove.tilePosition,
                }
              : undefined,
          }}
        />
      </div>
    </div>
  );
}
