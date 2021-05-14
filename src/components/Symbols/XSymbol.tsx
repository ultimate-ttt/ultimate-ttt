import * as React from 'react';
import classNames from 'classnames';
import styles from './Symbols.module.css';
import { XGameIcon } from '../Icons';

export interface XSymbolProps {
  shouldAnimate?: boolean;
}

export class XSymbol extends React.Component<XSymbolProps> {
  public static defaultProps: Partial<XSymbolProps> = {
    shouldAnimate: true,
  };

  render() {
    const { shouldAnimate } = this.props;
    const iconClass = classNames({
      [styles.x]: true,
      [styles.animateX]: shouldAnimate,
    });

    return <XGameIcon className={iconClass} />;
  }
}
