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
import { useState } from 'react';
import {
  getBoards,
  getCurrentPlayer,
  getOnlinePlayer,
} from '../../state/selectors/appStateSelectors';

interface OnlineProps {
  gameId?: string;
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
  onCreateGame: () => void; // TODO do this somewhere else?
  onJoinGame: (id: string) => void;
}

const Online = (props: OnlineProps) => {
  const {
    gameId,
    onlinePlayer,
    currentPlayer,
    board,
    activeBoards,
    onPlayerMoved,
  } = props;
  const [value, setValue] = useState('');
  const onChange = (event: any) => {
    setValue(event.target.value);
  };

  const moveAllowed = gameId && currentPlayer === onlinePlayer;

  return (
    <div className="centerAll">
      <div className={styles.gameWrapper}>
        <Button onClick={props.onCreateGame}>Create Game</Button>
        <input value={value} onChange={onChange} />
        <Button
          onClick={() => {
            props.onJoinGame(value);
          }}
        >
          Join Game
        </Button>
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
  gameId: state.currentGame.online.gameId,
  onlinePlayer: getOnlinePlayer(state),
  currentPlayer: getCurrentPlayer(state),
  board: getBoards(state),
  activeBoards: state.currentGame.activeBoards,
});

const mapDispatchToProps = {
  onPlayerMoved: (
    boardX: number,
    boardY: number,
    tileX: number,
    tileY: number,
  ) => playerMoved({ x: boardX, y: boardY }, { x: tileX, y: tileY }),
  onCreateGame: () => createGame(),
  onJoinGame: (id: string) => joinGame(id),
};

export default connect(mapStateToProps, mapDispatchToProps)(Online);
