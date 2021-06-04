import * as React from 'react';
import { Button, ButtonProps } from '@rmwc/button';
import { ArrowLeftIcon, ArrowRightIcon } from '../Icons';
import styles from './ArrowButtons.module.css';
import { useEffect } from 'react';

export interface ButtonConfig {
  buttonProps?: ButtonProps;
  hide?: boolean;
}

export interface ArrowButtonsProps {
  value: number;
  maxValue: number;
  minValue: number;
  onInteraction: (forward: boolean) => void;
  handleKeyboard?: boolean;
  leftButtonConfig?: ButtonConfig;
  rightButtonConfig?: ButtonConfig;
  children?: React.ReactNode;
}

const handleInteraction = (
  forward: boolean,
  value: number,
  minValue: number,
  maxValue: number,
  handle: (f: boolean) => void,
) => {
  if ((forward && value === maxValue) || (!forward && value === minValue))
    return;

  handle(forward);
};

export function ArrowButtons(props: ArrowButtonsProps) {
  const {
    handleKeyboard,
    value,
    maxValue,
    minValue,
    onInteraction,
    leftButtonConfig,
    rightButtonConfig,
    children,
  } = props;
  useEffect(() => {
    const handleEvent = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' || event.key === 'Left')
        handleInteraction(false, value, minValue, maxValue, onInteraction);
      else if (event.key === 'ArrowRight' || event.key === 'Right')
        handleInteraction(true, value, minValue, maxValue, onInteraction);
    };

    if (handleKeyboard) window.addEventListener('keydown', handleEvent);
    return () => {
      if (handleKeyboard) window.removeEventListener('keydown', handleEvent);
    };
  }, [handleKeyboard, value, minValue, maxValue, onInteraction]);

  return (
    <>
      {!leftButtonConfig?.hide && (
        <Button
          disabled={value === minValue}
          dense={true}
          raised={true}
          icon={{ icon: <ArrowLeftIcon />, 'aria-hidden': true }}
          onClick={() => {
            handleInteraction(false, value, minValue, maxValue, onInteraction);
          }}
          className={styles.buttonMargin}
          {...leftButtonConfig?.buttonProps}
        >
          Previous
        </Button>
      )}
      {children}
      {!rightButtonConfig?.hide && (
        <Button
          disabled={value === maxValue}
          dense={true}
          raised={true}
          trailingIcon={{ icon: <ArrowRightIcon />, 'aria-hidden': true }}
          onClick={() => {
            handleInteraction(true, value, minValue, maxValue, onInteraction);
          }}
          className={styles.buttonMargin}
          {...rightButtonConfig?.buttonProps}
        >
          Next
        </Button>
      )}
    </>
  );
}
