import * as React from 'react';
import './symbols.css';
import '../../fonts/icons.css';
import './symbolAnimations.css';
import classNames from 'classnames';

interface DrawSymbolProps {
  shouldAnimate?: boolean;
}

export class NoWinnerSymbol extends React.Component<DrawSymbolProps> {
  public static defaultProps: Partial<DrawSymbolProps> = {
    shouldAnimate: true,
  };

  render() {
    const { shouldAnimate } = this.props;

    const iconClass = classNames({
      'icon-draw': true,
      'big-symbol': true,
      draw: true,
      'animate-draw': shouldAnimate,
    });

    return <i className={iconClass} aria-label="Draw Symbol" />;
  }
}
