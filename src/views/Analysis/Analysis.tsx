import * as React from 'react';
import { BigBoard } from '../../components/Board/BigBoard/BigBoard';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import {
  AppState,
  Move,
  Player,
  SmallBoardInformation,
} from '../../state/AppState';
import {
  loadFinishedGame,
  moveBackwardInHistory,
  moveForwardInHistory,
} from '../../state/analysisGame/analysisGameActions';
import './analysis.css';
import { Point } from '../../util/Point';
import { HistoryButtons } from '../../components/Analysis/HistoryButtons';
import { MoveList } from '../../components/Analysis/MoveList';

interface AnalysisProps extends RouteComponentProps<{ id: string }> {
  onLoad: (id: string) => void;
  moveForwardInHistory: (numberOfMoves: number) => void;
  moveBackwardInHistory: (numberOfMoves: number) => void;
  reversedMoves?: Move[];
  board: SmallBoardInformation[];
  activeBoards: Point[];
  currentPlayer: Player;
  currentMove: number;
}

export class Analysis extends React.Component<AnalysisProps> {
  componentDidMount = () => {
    const id = this.props.match.params.id;
    this.props.onLoad(id);
  };

  render() {
    const {
      reversedMoves,
      board,
      activeBoards,
      currentPlayer,
      currentMove,
    } = this.props;

    const currentlyAppliedMove =
      reversedMoves &&
      reversedMoves[
        reversedMoves.findIndex((m) => m.moveNumber === currentMove)!
      ];

    return (
      <div className="center">
        <div className="analysisLayout">
          <div id="moveList" className="moveList">
            {reversedMoves && (
              <MoveList
                currentMove={currentMove}
                reversedMoves={reversedMoves}
                moveForwardInHistory={this.props.moveForwardInHistory}
                moveBackwardInHistory={this.props.moveBackwardInHistory}
              />
            )}
          </div>
          <div className="historyButtons">
            {reversedMoves && (
              <HistoryButtons
                currentMove={currentMove}
                lastMove={reversedMoves[0] && reversedMoves[0].moveNumber}
                moveForwardInHistory={this.props.moveForwardInHistory}
                moveBackwardInHistory={this.props.moveBackwardInHistory}
              />
            )}
          </div>
          <div className="analysisGame">
            {reversedMoves && (
              <BigBoard
                // tslint:disable-next-line:no-empty
                onPlayerMoved={() => {}}
                board={board}
                activeBoards={activeBoards}
                currentPlayer={currentPlayer}
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
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  reversedMoves: state.analysisGame.moves.slice().reverse(),
  board: state.analysisGame.board,
  activeBoards: state.analysisGame.activeBoards,
  currentPlayer: state.analysisGame.game.currentPlayer,
  currentMove: state.analysisGame.currentMove,
});

// tslint:disable-next-line: no-any
const mapDispatchToProps = (dispatch: any) => ({
  onLoad: (id: string) => dispatch(loadFinishedGame(id)),
  moveForwardInHistory: (numberOfMoves: number) =>
    dispatch(moveForwardInHistory(numberOfMoves)),
  moveBackwardInHistory: (numberOfMoves: number) =>
    dispatch(moveBackwardInHistory(numberOfMoves)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Analysis);
