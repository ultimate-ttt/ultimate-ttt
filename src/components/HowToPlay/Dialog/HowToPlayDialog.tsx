import * as React from 'react';
import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogButton,
  DialogContent,
  DialogTitle,
} from '@rmwc/dialog';
import { HowToPlayContent } from '../Content/HowToPlayContent';
import { steps } from '../HowToPlaySteps';
import styles from './HowToPlayDialog.module.css';
import { DialogOnCloseEventT } from '@rmwc/dialog/dist/dialog';
import { ArrowLeftIcon, ArrowRightIcon } from '../../Icons';

export interface HowToPlayDialogProps {
  onClose: (evt: DialogOnCloseEventT) => void;
}

export function HowToPlayDialog(props: HowToPlayDialogProps) {
  const [stepNumber, setStepNumber] = useState(0);
  const step = steps[stepNumber];

  return (
    <Dialog className={styles.dialog} open={true} onClose={props.onClose}>
      <DialogTitle>How to play</DialogTitle>
      <DialogContent>
        <HowToPlayContent
          text={step.text}
          boardStates={step.states}
          moves={step.moves}
        />
      </DialogContent>
      <DialogActions>
        <DialogButton action="close">Cancel</DialogButton>
        <DialogButton
          className={styles.push}
          icon={{ icon: <ArrowLeftIcon />, 'aria-hidden': true }}
          disabled={stepNumber === 0}
          onClick={() => {
            setStepNumber(stepNumber - 1);
          }}
        >
          Previous
        </DialogButton>
        <DialogButton
          trailingIcon={{ icon: <ArrowRightIcon />, 'aria-hidden': true }}
          disabled={stepNumber === steps.length - 1}
          onClick={() => {
            setStepNumber(stepNumber + 1);
          }}
          isDefaultAction
        >
          Next
        </DialogButton>
      </DialogActions>
    </Dialog>
  );
}
