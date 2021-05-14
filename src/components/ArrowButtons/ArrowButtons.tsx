import * as React from 'react';
import { Button } from '@rmwc/button';
import { ArrowLeftIcon, ArrowRightIcon } from '../Icons';
import styles from './ArrowButtons.module.css';
import { useEffect, useState } from 'react';

export interface ArrowButtonsProps {
  initialValue: number;
  maxValue: number;
  minValue: number;
  onInteraction: (forward: boolean) => void;
  handleKeyboard?: boolean;
  children?: React.ReactNode;
}

export function ArrowButtons(props: ArrowButtonsProps) {
  const [value, setValue] = useState(props.initialValue);

  const handleEvent = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft' || event.key === 'Left')
      handleInteraction(false);
    else if (event.key === 'ArrowRight' || event.key === 'Right')
      handleInteraction(true);
  };

  const handleInteraction = (forward: boolean) => {
    if ((forward && value === maxValue) || (!forward && value === minValue))
      return;

    if (forward) setValue(value + 1);
    else setValue(value - 1);
    onInteraction(forward);
  };

  useEffect(() => {
    if (props.handleKeyboard) window.addEventListener('keydown', handleEvent);
    return () => {
      if (props.handleKeyboard)
        window.removeEventListener('keydown', handleEvent);
    };
  }, [props.handleKeyboard]);

  const { maxValue, minValue, onInteraction, children } = props;
  return (
    <>
      <Button
        disabled={value === minValue}
        dense={true}
        raised={true}
        icon={{ icon: <ArrowLeftIcon />, 'aria-hidden': true }}
        onClick={() => {
          handleInteraction(false);
        }}
        className={styles.buttonMargin}
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
          handleInteraction(true);
        }}
        className={styles.buttonMargin}
      >
        Next
      </Button>
    </>
  );
}
