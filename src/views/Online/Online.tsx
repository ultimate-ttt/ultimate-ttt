import * as React from 'react';
import { BigBoard } from '../../components/Board/BigBoard/BigBoard';
import { AppState, Player, SmallBoardInformation } from '../../state/AppState';
import { playerMoved } from '../../state/currentGame/game/gameAction';
import { connect } from 'react-redux';
import { Point } from '../../lib';
import { Button } from '@rmwc/button';

interface OnlineProps {
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

const Online = (props: OnlineProps) => {
  const { currentPlayer, board, activeBoards, onPlayerMoved } = props;

  // TODO when current player is not the same player: remove onPlayerMoved

  return (
    <div className="centerAll">
      <Button>Create Game</Button>
      <Button>Join Game</Button>
      <BigBoard
        currentPlayer={currentPlayer}
        board={board}
        activeBoards={activeBoards}
        onPlayerMoved={onPlayerMoved}
      />
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  currentPlayer: state.currentGame.game.currentPlayer,
  board: state.currentGame.board,
  activeBoards: state.currentGame.activeBoards,
});

const mapDispatchToProps = {
  onPlayerMoved: (
    boardX: number,
    boardY: number,
    tileX: number,
    tileY: number,
  ) => playerMoved({ x: boardX, y: boardY }, { x: tileX, y: tileY }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Online);
