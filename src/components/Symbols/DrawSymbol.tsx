import * as React from 'react';
import classNames from 'classnames';
import styles from './Symbols.module.css';

export interface DrawSymbolProps {
  shouldAnimate?: boolean;
}

export function DrawSymbol(props: DrawSymbolProps) {
  const { shouldAnimate } = props;

  const iconClass = classNames({
    [styles.draw]: true,
    [styles.animateDraw]: shouldAnimate ?? true,
  });

  return (
    <svg
      aria-label={'-'}
      className={iconClass}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <path d="M25.333 17.333h-18.667v-2.667h18.667v2.667z"></path>
    </svg>
  );
}
