import * as React from 'react';
import classNames from 'classnames';
import styles from './Symbols.module.css';
import { OGameIcon } from '../Icons';

export interface OSymbolProps {
  shouldAnimate?: boolean;
}

export class OSymbol extends React.Component<OSymbolProps> {
  render() {
    const { shouldAnimate } = this.props;
    const iconClass = classNames({
      [styles.o]: true,
      [styles.animateO]: shouldAnimate ?? true,
    });

    return <OGameIcon className={iconClass} aria-label={'O'} />;
  }
}
