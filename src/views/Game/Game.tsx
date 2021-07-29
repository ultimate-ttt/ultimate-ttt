import * as React from 'react';
import { BigBoard } from '../../components/Board/BigBoard/BigBoard';
import { AppState, Player, SmallBoardInformation } from '../../state/AppState';
import { playerMoved } from '../../state/currentGame/game/gameAction';
import { connect } from 'react-redux';
import { Point } from '../../lib';
import styles from './Game.module.css';
import GameFinishedDisplay from './GameFinishedDisplay/GameFinishedDisplay';

interface GameProps {
  currentPlayer: Player;
  board: SmallBoardInformation[];
  activeBoards: Point[];
  onPlayerMoved: (board: Point, tile: Point) => void;
}

const Game = (props: GameProps) => {
  const { currentPlayer, board, activeBoards, onPlayerMoved } = props;

  // TODO migrate to hooks
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
};

const mapStateToProps = (state: AppState) => ({
  currentPlayer: state.currentGame.game.currentPlayer,
  board: state.currentGame.board,
  activeBoards: state.currentGame.activeBoards,
});

const mapDispatchToProps = {
  onPlayerMoved: (board: Point, tile: Point) => playerMoved(board, tile),
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
