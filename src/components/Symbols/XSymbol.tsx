import * as React from 'react';
import './symbols.css';
import './symbolAnimations.css';
import '../../fonts/icons.css';
import classNames from 'classnames';

interface XSymbolProps {
  bigSymbol?: boolean;
  shouldAnimate?: boolean;
  className?: string;
}

export class XSymbol extends React.Component<XSymbolProps> {
  public static defaultProps: Partial<XSymbolProps> = {
    shouldAnimate: true,
  };

  render() {
    const { bigSymbol, shouldAnimate, className } = this.props;
    const iconClass = classNames({
      'icon-x': true,
      x: true,
      'big-symbol': bigSymbol,
      'animate-x': shouldAnimate,
      className: className,
    });

    return <i className={iconClass} aria-label="Cross Symbol" />;
  }
}
