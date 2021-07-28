import { useDispatch, useSelector } from 'react-redux';
import { createGame } from '../../state/currentGame/online/onlineAction';
import { useState } from 'react';
import { getOnlineGameId } from '../../state/selectors/appStateSelectors';
import { Redirect } from 'react-router';
import routes from '../../routes';
import { Button } from '@rmwc/button';
import * as React from 'react';

const OnlineCreate = () => {
  const dispatch = useDispatch();
  const gameId = useSelector(getOnlineGameId);
  const [clicked, setClicked] = useState(false);

  const onClick = () => {
    dispatch(createGame());
    setClicked(true);
  };

  return (
    <>
      <Button onClick={onClick} disabled={clicked}>
        Create Game
      </Button>
      {gameId && <Redirect to={routes.OnlinePlay.replace(':id', gameId)} />}
    </>
  );
};

export default OnlineCreate;
