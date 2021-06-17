import * as React from 'react';
import classNames from 'classnames';
import styles from './Symbols.module.css';
import { DrawGameIcon } from '../Icons';

export interface DrawSymbolProps {
  shouldAnimate?: boolean;
}

export class DrawSymbol extends React.Component<DrawSymbolProps> {
  render() {
    const { shouldAnimate } = this.props;

    const iconClass = classNames({
      [styles.draw]: true,
      [styles.animateDraw]: shouldAnimate ?? true,
    });

    return <DrawGameIcon className={iconClass} aria-label={'-'} />;
  }
}
