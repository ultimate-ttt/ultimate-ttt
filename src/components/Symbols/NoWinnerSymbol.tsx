import * as React from 'react';
import './symbols.css';
import '../../fonts/icons.css';
import './symbolAnimations.css';
import * as classNames from 'classnames';

interface NoWinnerSymbolProps {
  shouldAnimate?: boolean;
}

export class NoWinnerSymbol extends React.Component<NoWinnerSymbolProps> {
  public static defaultProps: Partial<NoWinnerSymbolProps> = {
    shouldAnimate: true,
  };

  render() {
    const { shouldAnimate } = this.props;

    const iconClass = classNames({
      'icon-no-winner': true,
      'big-symbol': true,
      'no-winner': true,
      'animate-no-winner': shouldAnimate,
    });

    return <i className={iconClass} aria-label="No Winner Symbol" />;
  }
}
