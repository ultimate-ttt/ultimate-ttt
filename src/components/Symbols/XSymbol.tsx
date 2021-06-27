import * as React from 'react';
import classNames from 'classnames';
import styles from './Symbols.module.css';

export interface XSymbolProps {
  shouldAnimate?: boolean;
}

export function XSymbol(props: XSymbolProps) {
  const { shouldAnimate } = props;
  const iconClass = classNames({
    [styles.x]: true,
    [styles.animateX]: shouldAnimate ?? true,
  });

  return (
    <svg
      className={iconClass}
      aria-label={'X'}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <path d="M25.333 8.547l-1.88-1.88-7.453 7.453-7.453-7.453-1.88 1.88 7.453 7.453-7.453 7.453 1.88 1.88 7.453-7.453 7.453 7.453 1.88-1.88-7.453-7.453z"></path>
    </svg>
  );
}
