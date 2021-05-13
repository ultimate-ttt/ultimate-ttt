import * as React from 'react';
import classNames from 'classnames';
import { DrawGameIcon } from '../Icons';
import styles from './Symbols.module.css';

export interface DrawSymbolProps {
  shouldAnimate?: boolean;
}

export class DrawSymbol extends React.Component<DrawSymbolProps> {
  public static defaultProps: Partial<DrawSymbolProps> = {
    shouldAnimate: true,
  };

  render() {
    const { shouldAnimate } = this.props;

    const iconClass = classNames({
      [styles.draw]: true,
      [styles.animateDraw]: shouldAnimate,
    });

    return <DrawGameIcon className={iconClass} />;
  }
}
