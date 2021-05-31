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
import { Player, SmallBoardInformation } from '../../../state/AppState';
import { Point } from '../../../util';

export interface HowToPlayDialogProps {
  onClose: (evt: DialogOnCloseEventT) => void;
  stepNumber: number;
  maxStepNumber: number;
  text: string;
  board: SmallBoardInformation[];
  currentPlayer: Player;
  activeBoards: Point[];
  onForward: () => void;
  onBackward: () => void;
}

export function HowToPlayDialog(props: HowToPlayDialogProps) {
  return (
    <Dialog className={styles.dialog} open={true} onClose={props.onClose}>
      <DialogTitle>How to play</DialogTitle>
      <DialogContent>
        <HowToPlayStep
          text={props.text}
          board={props.board}
          activeBoards={props.activeBoards}
          currentPlayer={props.currentPlayer}
        />
      </DialogContent>
      <DialogActions>
        <DialogButton
          className={classNames([styles.push, styles.cancel])}
          action="close"
        >
          Cancel
        </DialogButton>
        <ArrowButtons
          value={props.stepNumber}
          maxValue={props.maxStepNumber}
          minValue={0}
          onInteraction={(forward) => {
            if (forward) props.onForward();
            else props.onBackward();
          }}
          buttonProps={{ raised: false }}
        />
      </DialogActions>
    </Dialog>
  );
}
