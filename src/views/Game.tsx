import * as React from 'react';
import { BigBoard } from '../components/Board/BigBoard/BigBoard';
import GameFinishedDisplay from '../components/GameFinishedDisplay/GameFinishedDisplay';
import { AppState, Player, SmallBoardInformation } from '../state/AppState';
import { playerMoved } from '../state/currentGame/game/gameAction';
import { connect } from 'react-redux';
import { Point } from '../util/Point';

interface GameProps {
  currentPlayer: Player;
  board: SmallBoardInformation[];
  activeBoards: Point[];
  onPlayerMoved: (
    boardX: number,
    boardY: number,
    tileX: number,
    tileY: number,
  ) => void;
}

class Game extends React.Component<GameProps> {
  render() {
    const { currentPlayer, board, activeBoards, onPlayerMoved } = this.props;

    return (
      <div className="center">
        <div className="game-wrapper">
          <GameFinishedDisplay />
          <BigBoard
              currentPlayer={currentPlayer}
              board={board}
              activeBoards={activeBoards}
              onPlayerMoved={onPlayerMoved}
              movesAllowed={true}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  currentPlayer: state.currentGame.game.currentPlayer,
  board: state.currentGame.board,
  activeBoards: state.currentGame.activeBoards,
});

// tslint:disable-next-line: no-any
const mapDispatchToProps = (dispatch: any) => ({
  onPlayerMoved: (
    boardX: number,
    boardY: number,
    tileX: number,
    tileY: number,
  ) => dispatch(playerMoved({ x: boardX, y: boardY }, { x: tileX, y: tileY })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game);
