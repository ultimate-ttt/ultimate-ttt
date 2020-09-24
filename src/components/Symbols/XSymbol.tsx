import * as React from 'react';
import classNames from 'classnames';
import { ReactComponent as XIcon } from '../../icons/svg/x.svg';
import styles from './Symbols.module.css';

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

    return <XIcon className={iconClass} />;
  }
}
