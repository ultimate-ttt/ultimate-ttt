import * as React from 'react';
import { useState } from 'react';
import { Button } from '@rmwc/button';
import {
  Dialog,
  DialogActions,
  DialogButton,
  DialogContent,
  DialogTitle,
} from '@rmwc/dialog';
import { HowToPlayContent } from '../Content/HowToPlayContent';
import icons from '../../../icons/icons';
import { steps } from '../HowToPlaySteps';
import styles from './HowToPlayDialog.module.css';

export function HowToPlayDialog() {
  const [open, setOpen] = useState(false); // TODO add a wrapper component

  const [stepNumber, setStepNumber] = useState(0);
  const step = steps[stepNumber];

  return (
    <>
      <Dialog
        className={styles.dialog}
        open={open}
        onClose={() => setOpen(false)}
      >
        {open && (
          <>
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
                icon={{ icon: icons.arrowLeft, 'aria-hidden': true }}
                disabled={stepNumber === 0}
                onClick={() => {
                  setStepNumber(stepNumber - 1);
                }}
              >
                Previous
              </DialogButton>
              <DialogButton
                trailingIcon={{ icon: icons.arrowRight, 'aria-hidden': true }}
                disabled={stepNumber === steps.length - 1}
                onClick={() => {
                  setStepNumber(stepNumber + 1);
                }}
                isDefaultAction
              >
                Next
              </DialogButton>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Button raised onClick={() => setOpen(true)}>
        Open standard Dialog
      </Button>
    </>
  );
}
