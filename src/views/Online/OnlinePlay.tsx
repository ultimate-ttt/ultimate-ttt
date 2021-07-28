// @ts-nocheck
/* eslint-disable */
// TODO
import * as React from 'react';
import { BigBoard } from '../../components/Board/BigBoard/BigBoard';
import { AppState, Player, SmallBoardInformation } from '../../state/AppState';
import { playerMoved } from '../../state/currentGame/game/gameAction';
import { connect } from 'react-redux';
import { Point } from '../../lib';
import { Button } from '@rmwc/button';
import {
  createGame,
  joinGame,
} from '../../state/currentGame/online/onlineAction';
import styles from './Online.module.css';
import { useEffect } from 'react';
import {
  getBoards,
  getCurrentPlayer,
  getIsOnlineGame,
  getOnlinePlayer,
} from '../../state/selectors/appStateSelectors';
import { useParams } from 'react-router';

interface OnlineProps {
  isOnlineGame: boolean;
  currentPlayer: Player;
  onlinePlayer: Player;
  board: SmallBoardInformation[];
  activeBoards: Point[];
  onPlayerMoved: (
    boardX: number,
    boardY: number,
    tileX: number,
    tileY: number,
  ) => void;
  onJoinGame: (id: string) => void;
  shouldJoinGame: boolean;
}

const OnlinePlay = (props: OnlineProps) => {
  const {
    shouldJoinGame,
    onJoinGame,
    isOnlineGame,
    onlinePlayer,
    currentPlayer,
    board,
    activeBoards,
    onPlayerMoved,
  } = props;

  // TODO: do this
  /* let { id }: { id: string } = useParams();
  console.log(shouldJoinGame);
  console.log(id);
  useEffect(() => {
    if (shouldJoinGame && id !== undefined && id.length === 6) {
      onJoinGame(id);
    }
  });
*/
  const moveAllowed = isOnlineGame && currentPlayer === onlinePlayer;

  return (
    <div className="centerAll">
      <div className={styles.gameWrapper}>
        <BigBoard
          currentPlayer={currentPlayer}
          board={board}
          activeBoards={activeBoards}
          onPlayerMoved={moveAllowed ? onPlayerMoved : undefined}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  isOnlineGame: getIsOnlineGame(state),
  onlinePlayer: getOnlinePlayer(state),
  currentPlayer: getCurrentPlayer(state),
  board: getBoards(state),
  activeBoards: state.currentGame.activeBoards,
  shouldJoinGame:
    state.currentGame.online.connectGame.saveState === '' &&
    !getIsOnlineGame(state),
});

const mapDispatchToProps = {
  onPlayerMoved: (
    boardX: number,
    boardY: number,
    tileX: number,
    tileY: number,
  ) => playerMoved({ x: boardX, y: boardY }, { x: tileX, y: tileY }),
  onJoinGame: (id: string) => joinGame(id),
};

export default connect(mapStateToProps, mapDispatchToProps)(OnlinePlay);
