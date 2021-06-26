import * as React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@rmwc/dialog';
import styles from './HowToPlayDialog.module.css';
import { HowToPlayContent } from './HowToPlayContent';
import { HowToPlayBoardState } from '../../state/AppState';
import { DialogActionBar } from './DialogActionBar';
import { useKeyPressEvent } from 'react-use';
import { Keys } from '../../lib';

export interface HowToPlayDialogProps {
  onClose: () => void;
  onForward: () => void;
  onBackward: () => void;
  stepNumber: number;
  maxStepNumber: number;
  text: React.ReactNode;
  boardState: HowToPlayBoardState;
}

export function HowToPlayDialog(props: HowToPlayDialogProps) {
  const {
    onClose,
    onForward,
    onBackward,
    stepNumber,
    maxStepNumber,
    text,
    boardState,
  } = props;

  // preventOutsideDismiss also disables Escape key, so we enable it manually
  useKeyPressEvent(Keys.Escape, onClose, null);

  return (
    <Dialog
      className={styles.dialog}
      open={true}
      onClose={onClose}
      preventOutsideDismiss={true}
    >
      <DialogTitle>How to play</DialogTitle>
      <DialogContent>
        <p>{text}</p>
        <div className={styles.bigBoard}>
          <HowToPlayContent boardState={boardState} />
        </div>
      </DialogContent>
      <DialogActions>
        <DialogActionBar
          onClose={onClose}
          onForward={onForward}
          onBackward={onBackward}
          stepNumber={stepNumber}
          maxStepNumber={maxStepNumber}
        />
      </DialogActions>
    </Dialog>
  );
}
