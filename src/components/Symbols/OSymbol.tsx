import * as React from 'react';
import './symbols.css';
import './symbolAnimations.css';
import '../../fonts/icons.css';
import * as classNames from 'classnames';

interface OSymbolProps {
  bigSymbol?: boolean;
  shouldAnimate?: boolean;
  className?: string;
}

export class OSymbol extends React.Component<OSymbolProps> {
  public static defaultProps: Partial<OSymbolProps> = {
    shouldAnimate: true,
  };

  render() {
    const { bigSymbol, shouldAnimate, className } = this.props;
    const iconClass = classNames({
      'icon-o': true,
      o: true,
      'big-symbol': bigSymbol,
      'animate-o': shouldAnimate,
      className: className,
    });

    return <i className={iconClass} aria-label="Circle Symbol" />;
  }
}
