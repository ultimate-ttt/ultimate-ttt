import * as React from 'react';
import classNames from 'classnames';
import styles from './Symbols.module.css';

export interface OSymbolProps {
  shouldAnimate?: boolean;
}

export function OSymbol(props: OSymbolProps) {
  const { shouldAnimate } = props;
  const iconClass = classNames({
    [styles.o]: true,
    [styles.animateO]: shouldAnimate ?? true,
  });

  return (
    <svg
      className={iconClass}
      aria-label={'O'}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <path d="M16 2.667c-7.373 0-13.333 5.96-13.333 13.333s5.96 13.333 13.333 13.333 13.333-5.96 13.333-13.333-5.96-13.333-13.333-13.333zM16 26.667c-5.88 0-10.667-4.787-10.667-10.667s4.787-10.667 10.667-10.667 10.667 4.787 10.667 10.667-4.787 10.667-10.667 10.667z"></path>
    </svg>
  );
}
