import * as React from 'react';
import classNames from 'classnames';
import { ReactComponent as DrawIcon } from '../../icons/svg/draw.svg';
import styles from './Symbols.module.css';

interface DrawSymbolProps {
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

    return <DrawIcon className={iconClass} />;
  }
}
