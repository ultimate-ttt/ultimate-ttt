import * as React from 'react';
import {
  Dialog,
  DialogActions,
  DialogButton,
  DialogContent,
  DialogTitle,
} from '@rmwc/dialog';
import styles from './HowToPlayDialog.module.css';
import { DialogOnCloseEventT } from '@rmwc/dialog/dist/dialog';
import { ArrowButtons } from '../../ArrowButtons/ArrowButtons';
import classNames from 'classnames';
import { HowToPlayStep } from '../Step/HowToPlayStep';
import { HowToPlayBoardState } from '../../../state/AppState';
import { useEffect } from 'react';

export interface HowToPlayDialogProps {
  onOpen: () => void;
  onClose: (evt: DialogOnCloseEventT) => void;
  onForward: () => void;
  onBackward: () => void;
  stepNumber: number;
  maxStepNumber: number;
  text: string;
  boardState: HowToPlayBoardState;
}

export function HowToPlayDialog(props: HowToPlayDialogProps) {
  const {
    onOpen,
    onClose,
    onForward,
    onBackward,
    stepNumber,
    maxStepNumber,
    text,
    boardState,
  } = props;
  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <Dialog className={styles.dialog} open={true} onClose={onClose}>
      <DialogTitle>How to play</DialogTitle>
      <DialogContent>
        <HowToPlayStep text={text} boardState={boardState} />
      </DialogContent>
      <DialogActions>
        <DialogButton
          className={classNames([styles.push, styles.cancel])}
          action="close"
        >
          Cancel
        </DialogButton>
        <ArrowButtons
          value={stepNumber}
          maxValue={maxStepNumber}
          minValue={0}
          onInteraction={(forward) => {
            if (forward) onForward();
            else onBackward();
          }}
          buttonProps={{ raised: false }}
        />
      </DialogActions>
    </Dialog>
  );
}
