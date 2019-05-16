import * as React from 'react';
import { BigBoard } from '../../components/Board/BigBoard/BigBoard';
import GameFinishedDisplay from '../../components/GameFinishedDisplay/GameFinishedDisplay';
import { AppState, Player, SmallBoardInformation } from '../../state/AppState';
import { playerMoved } from '../../state/currentGame/game/gameAction';
import { connect } from 'react-redux';
import { Point } from '../../util';
import styles from './Game.module.css';

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

export function Game(props: GameProps) {
  const { currentPlayer, board, activeBoards, onPlayerMoved } = props;

  return (
    <div className="centerAll">
      <div className={styles.gameWrapper}>
        <GameFinishedDisplay />
        <BigBoard
          currentPlayer={currentPlayer}
          board={board}
          activeBoards={activeBoards}
          onPlayerMoved={onPlayerMoved}
        />
      </div>
    </div>
  );
}

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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game);
