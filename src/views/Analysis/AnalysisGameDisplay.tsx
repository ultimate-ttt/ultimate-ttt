import * as React from 'react';
import { BigBoard } from '../../components/Board/BigBoard/BigBoard';
import { AnalysisGame } from '../../state/AppState';
import './AnalysisGame.css';
import { HistoryButtons } from '../../components/Analysis/HistoryButtons/HistoryButtons';
import { MoveList } from '../../components/Analysis/MoveList/MoveList';
import { scroller } from 'react-scroll/modules';
import { moveScrollElementBaseName } from '../../components/Analysis/ScrollElementConstants';

interface AnalysisGameDisplayProps {
  moveForwardInHistory: (numberOfMoves: number) => void;
  moveBackwardInHistory: (numberOfMoves: number) => void;
  analysisGame: AnalysisGame;
}

// TODO Hooks + Function Component?

export class AnalysisGameDisplay extends React.Component<
  AnalysisGameDisplayProps
> {
  scrollToElement = (moveNumberToScrollTo: number) => {
    scroller.scrollTo(moveScrollElementBaseName + moveNumberToScrollTo, {
      duration: 300,
      smooth: true,
      containerId: 'moveList',
      offset: -108,
    });
  };

  render() {
    const { analysisGame } = this.props;

    if (!analysisGame) {
      return <></>;
    }

    const reversedMoves = analysisGame.moves.slice().reverse();
    const currentlyAppliedMove =
      reversedMoves &&
      reversedMoves[
        reversedMoves.findIndex(
          (m) => m.moveNumber === analysisGame.currentMove,
        )!
      ];

    return (
      <div className="center">
        <div className="analysisLayout">
          <div id="moveList" className="moveList">
            <MoveList
              currentMove={analysisGame.currentMove}
              reversedMoves={reversedMoves}
              moveForwardInHistory={this.props.moveForwardInHistory}
              moveBackwardInHistory={this.props.moveBackwardInHistory}
            />
          </div>
          <div className="historyButtons">
            <HistoryButtons
              currentMove={analysisGame.currentMove}
              lastMove={reversedMoves[0] && reversedMoves[0].moveNumber}
              moveForwardInHistory={this.props.moveForwardInHistory}
              moveBackwardInHistory={this.props.moveBackwardInHistory}
              onInteraction={this.scrollToElement}
            />
          </div>
          <div className="analysisGame">
            <BigBoard
              // tslint:disable-next-line:no-empty
              onPlayerMoved={() => {}}
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
      </div>
    );
  }
}
