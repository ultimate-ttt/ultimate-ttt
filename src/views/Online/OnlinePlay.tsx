import * as React from 'react';
import { BigBoard } from '../../components/Board/BigBoard/BigBoard';
import { playerMoved } from '../../state/currentGame/game/gameAction';
import { useDispatch, useSelector } from 'react-redux';
import { joinGame } from '../../state/currentGame/online/onlineAction';
import styles from './Online.module.css';
import { useEffect } from 'react';
import {
  getActiveBoards,
  getBoards,
  getCurrentPlayer,
} from '../../state/selectors/appStateSelectors';
import {
  getIsOnlineGame,
  getOnlinePlayer,
  getShouldJoinGame,
} from '../../state/selectors/onlineStateSelectors';
import { useParams } from 'react-router';
import { Point } from '../../lib';

const OnlinePlay = () => {
  const dispatch = useDispatch();

  let { id }: { id: string } = useParams();
  const shouldJoinGame = useSelector(getShouldJoinGame);
  useEffect(() => {
    if (shouldJoinGame && id !== undefined && id.length === 6) {
      dispatch(joinGame(id));
    }
  });

  const onPlayerMoved = (board: Point, tile: Point) =>
    dispatch(playerMoved(board, tile));
  const currentPlayer = useSelector(getCurrentPlayer);
  const onlinePlayer = useSelector(getOnlinePlayer);
  // TODO don't allow first move before other player joined
  const moveAllowed =
    useSelector(getIsOnlineGame) && currentPlayer === onlinePlayer;
  return (
    <div className="centerAll">
      <div className={styles.gameWrapper}>
        <BigBoard
          currentPlayer={currentPlayer}
          board={useSelector(getBoards)}
          activeBoards={useSelector(getActiveBoards)}
          onPlayerMoved={moveAllowed ? onPlayerMoved : undefined}
        />
      </div>
    </div>
  );
};

export default OnlinePlay;
