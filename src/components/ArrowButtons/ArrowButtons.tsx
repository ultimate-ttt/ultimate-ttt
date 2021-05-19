import * as React from 'react';
import { Button, ButtonProps } from '@rmwc/button';
import { ArrowLeftIcon, ArrowRightIcon } from '../Icons';
import styles from './ArrowButtons.module.css';
import { useEffect } from 'react';

export interface ArrowButtonsProps {
  value: number;
  maxValue: number;
  minValue: number;
  onInteraction: (forward: boolean) => void;
  handleKeyboard?: boolean;
  buttonProps?: ButtonProps;
  children?: React.ReactNode;
}

const handleInteraction = (forward: boolean, props: ArrowButtonsProps) => {
  if (
    (forward && props.value === props.maxValue) ||
    (!forward && props.value === props.minValue)
  )
    return;

  props.onInteraction(forward);
};

export function ArrowButtons(props: ArrowButtonsProps) {
  useEffect(() => {
    const handleEvent = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' || event.key === 'Left')
        handleInteraction(false, props);
      else if (event.key === 'ArrowRight' || event.key === 'Right')
        handleInteraction(true, props);
    };

    if (props.handleKeyboard) window.addEventListener('keydown', handleEvent);
    return () => {
      if (props.handleKeyboard)
        window.removeEventListener('keydown', handleEvent);
    };
  }, [props]);

  const { value, maxValue, minValue, buttonProps, children } = props;
  return (
    <>
      <Button
        disabled={value === minValue}
        dense={true}
        raised={true}
        icon={{ icon: <ArrowLeftIcon />, 'aria-hidden': true }}
        onClick={() => {
          handleInteraction(false, props);
        }}
        className={styles.buttonMargin}
        {...buttonProps}
      >
        Previous
      </Button>
      {children}
      <Button
        disabled={value === maxValue}
        dense={true}
        raised={true}
        trailingIcon={{ icon: <ArrowRightIcon />, 'aria-hidden': true }}
        onClick={() => {
          handleInteraction(true, props);
        }}
        className={styles.buttonMargin}
        {...buttonProps}
      >
        Next
      </Button>
    </>
  );
}
