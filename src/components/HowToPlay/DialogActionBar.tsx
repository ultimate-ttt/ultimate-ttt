import { DialogButton } from '@rmwc/dialog';
import { ArrowButtons } from '../ArrowButtons/ArrowButtons';
import { Button } from '@rmwc/button';
import { ArrowRightIcon } from '../Icons';
import * as React from 'react';

interface DialogActionBarProps {
  onClose: () => void;
  onForward: () => void;
  onBackward: () => void;
  stepNumber: number;
  maxStepNumber: number;
}

export function DialogActionBar(props: DialogActionBarProps) {
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
          forward ? onForward() : onBackward();
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
