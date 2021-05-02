import * as React from 'react';
import { Button } from '@rmwc/button';
import {
  Dialog,
  DialogActions,
  DialogButton,
  DialogContent,
  DialogTitle,
} from '@rmwc/dialog';
import { BigBoard } from '../Board/BigBoard/BigBoard';
import { Player, TileValue } from '../../state/AppState';
import { SimpleTicTacToeGame } from '../../util';

export function HowToPlayDialog() {
  const [open, setOpen] = React.useState(false);

  const simpleState = [
    TileValue.Cross,
    TileValue.Cross,
    TileValue.Cross,
    TileValue.Circle,
    TileValue.Circle,
    TileValue.Empty,
    TileValue.Empty,
    TileValue.Empty,
    TileValue.Empty,
  ];
  const board = new SimpleTicTacToeGame(simpleState).getBoard();

  return (
    <>
      <Dialog
        open={open}
        onClose={(evt) => {
          console.log(evt.detail.action);
          setOpen(false);
        }}
        onClosed={(evt) => console.log(evt.detail.action)}
      >
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>
          <BigBoard
            currentPlayer={Player.Circle}
            board={board}
            activeBoards={[]}
          />
        </DialogContent>
        <DialogActions>
          <DialogButton action="close">Cancel</DialogButton>
          <DialogButton action="accept" isDefaultAction>
            Sweet!
          </DialogButton>
        </DialogActions>
      </Dialog>

      <Button raised onClick={() => setOpen(true)}>
        Open standard Dialog
      </Button>
    </>
  );
}
