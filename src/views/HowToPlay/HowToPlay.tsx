import * as React from 'react';
import { HowToPlayDialog } from '../../components/HowToPlay/Dialog/HowToPlayDialog';
import { useHistory } from 'react-router';
import routes from '../../routes/routes';

export function HowToPlay() {
  let history = useHistory();
  function handleClose() {
    history.push(routes.Home);
  }

  return <HowToPlayDialog onClose={handleClose} />;
}
