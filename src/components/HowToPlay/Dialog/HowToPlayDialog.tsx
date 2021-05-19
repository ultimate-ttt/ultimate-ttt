import * as React from 'react';
import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogButton,
  DialogContent,
  DialogTitle,
} from '@rmwc/dialog';
import { steps } from '../HowToPlaySteps';
import styles from './HowToPlayDialog.module.css';
import { DialogOnCloseEventT } from '@rmwc/dialog/dist/dialog';
import { ArrowButtons } from '../../ArrowButtons/ArrowButtons';
import classNames from 'classnames';
import { HowToPlayStep } from '../Step/HowToPlayStep';

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
        <HowToPlayStep
          text={step.text}
          boardStates={step.states}
          moves={step.moves}
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
          value={stepNumber}
          maxValue={steps.length - 1}
          minValue={0}
          onInteraction={(forward) => {
            if (forward) setStepNumber(stepNumber + 1);
            else setStepNumber(stepNumber - 1);
          }}
          buttonProps={{ raised: false }}
        />
      </DialogActions>
    </Dialog>
  );
}
