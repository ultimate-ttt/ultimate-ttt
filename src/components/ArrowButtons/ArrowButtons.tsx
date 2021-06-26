import * as React from 'react';
import { Button, ButtonProps } from '@rmwc/button';
import { ArrowLeftIcon, ArrowRightIcon } from '../Icons';
import styles from './ArrowButtons.module.css';
import { useKeyPressEvent } from 'react-use';
import { Keys } from "../../lib";

export interface ButtonConfig {
  buttonProps?: ButtonProps;
  hide?: boolean;
}

export interface ArrowButtonsProps {
  value: number;
  minValue: number;
  maxValue: number;
  onInteraction: (forward: boolean) => void;
  handleKeyboard?: boolean;
  leftButtonConfig?: ButtonConfig;
  rightButtonConfig?: ButtonConfig;
  children?: React.ReactNode;
}

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

  const handleInteraction = (forward: boolean) => {
    if ((forward && value === maxValue) || (!forward && value === minValue))
      return;
    onInteraction(forward);
  };
  const handleLeft = () => (handleKeyboard ? handleInteraction(false) : false);
  const handleRight = () => (handleKeyboard ? handleInteraction(true) : false);
  useKeyPressEvent(Keys.ArrowLeft, handleLeft, null);
  useKeyPressEvent(Keys.ArrowRight, handleRight, null);

  return (
    <>
      {!leftButtonConfig?.hide && (
        <Button
          disabled={value === minValue}
          dense={true}
          raised={true}
          icon={{ icon: <ArrowLeftIcon />, 'aria-hidden': true }}
          onClick={() => {
            handleInteraction(false);
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
            handleInteraction(true);
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
