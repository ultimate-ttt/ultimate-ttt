import * as React from 'react';
import './symbols.css';
import '../../fonts/icons.css';
import './symbolAnimations.css';
import * as classNames from 'classnames';

interface NoWinnerSymbolProps {}

interface NoWinnerSymbolState {}

export class NoWinnerSymbol extends React.Component<
  NoWinnerSymbolProps,
  NoWinnerSymbolState
> {
  constructor(props: NoWinnerSymbolProps) {
    super(props);
  }

  render() {
    const iconClass = classNames({
      'icon-no-winner': true,
      'big-symbol': true,
      'no-winner': true,
    });

    return <i className={iconClass} aria-label="No Winner Symbol" />;
  }
}