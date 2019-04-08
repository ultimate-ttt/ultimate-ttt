import * as React from 'react';
import './Tile.css';
import { TileValue } from '../../../state/AppState';
import { XSymbol } from '../../Symbols/XSymbol';
import { OSymbol } from '../../Symbols/OSymbol';
import { NoWinnerSymbol } from '../../Symbols/NoWinnerSymbol';

interface TileProps {
  onTileClicked?: () => void;
  value: TileValue;
  isTileRound: boolean;
  isClickable: boolean;
  isBig?: boolean;
  markSpecially?: boolean;
}

export class Tile extends React.Component<TileProps> {
  getValue = () => {
    const { isBig, markSpecially } = this.props;

    let shouldAnimate = true;
    if (markSpecially !== undefined) {
      if (!markSpecially) {
        shouldAnimate = false;
      }
    }

    switch (this.props.value) {
      case TileValue.Cross:
        return <XSymbol bigSymbol={isBig} shouldAnimate={shouldAnimate} />;
      case TileValue.Circle:
        return <OSymbol bigSymbol={isBig} shouldAnimate={shouldAnimate} />;
      case TileValue.Destroyed:
        return <NoWinnerSymbol shouldAnimate={shouldAnimate} />;
      case TileValue.Empty:
        return '';
    }
  };

  render() {
    const {
      onTileClicked,
      isTileRound,
      isClickable,
      value,
      markSpecially,
    } = this.props;
    let color = isClickable ? 'indicator' : 'normal';
    if (markSpecially) {
      color = 'special';
    }

    let roundness = isTileRound ? 'circle' : 'square';
    if (value === TileValue.Destroyed) {
      roundness = 'no-winner';
    }

    return (
      <div
        className={`tile ${color} ${roundness}`}
        onClick={() => {
          if (isClickable && onTileClicked) {
            onTileClicked();
          }
        }}
      >
        {this.getValue()}
      </div>
    );
  }
}
