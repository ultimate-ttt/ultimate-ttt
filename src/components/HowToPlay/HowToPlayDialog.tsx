import * as React from 'react';
import {
  Dialog,
  DialogActions,
  DialogButton,
  DialogContent,
  DialogTitle,
} from '@rmwc/dialog';
import styles from './HowToPlayDialog.module.css';
import { ArrowButtons } from '../ArrowButtons/ArrowButtons';
import { useEffect } from 'react';
import { HowToPlayContent } from './HowToPlayContent';
import { HowToPlayBoardState } from '../../state/AppState';
import { Button } from '@rmwc/button';
import { ArrowRightIcon } from '../Icons';

interface ActionBarProps {
  onClose: () => void;
  onForward: () => void;
  onBackward: () => void;
  stepNumber: number;
  maxStepNumber: number;
}

function ActionBar(props: ActionBarProps) {
  const { onClose, onForward, onBackward, stepNumber, maxStepNumber } = props;

  const isLastStep = stepNumber === maxStepNumber;
  const isFirstStep = stepNumber === 0;

  return (
    <>
      {isFirstStep && <DialogButton action="close">Cancel</DialogButton>}
      <ArrowButtons
        value={stepNumber}
        maxValue={maxStepNumber}
        minValue={0}
        onInteraction={(forward) => {
          if (forward) onForward();
          else onBackward();
        }}
        handleKeyboard={true}
        leftButtonConfig={{ buttonProps: { raised: false }, hide: isFirstStep }}
        rightButtonConfig={{
          buttonProps: { raised: false },
          hide: isLastStep,
        }}
      />
      {isLastStep && (
        <Button
          raised={true}
          trailingIcon={{ icon: <ArrowRightIcon />, 'aria-hidden': true }}
          onClick={onClose}
        >
          Let's Play
        </Button>
      )}
    </>
  );
}

export interface HowToPlayDialogProps {
  onOpen: () => void;
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
        <ActionBar
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
