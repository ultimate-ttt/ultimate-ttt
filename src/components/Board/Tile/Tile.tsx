import * as React from 'react';
import './tile.css';
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
}

export class Tile extends React.Component<TileProps> {
  getValue = () => {
    const { isBig } = this.props;
    switch (this.props.value) {
      case TileValue.Cross:
        return <XSymbol bigSymbol={isBig} />;
      case TileValue.Circle:
        return <OSymbol bigSymbol={isBig} />;
      case TileValue.Empty:
        return '';
      case TileValue.Destroyed:
        return <NoWinnerSymbol />;
    }
  };

  render() {
    const { onTileClicked, isTileRound, isClickable, value } = this.props;
    const color = isClickable ? 'indicator' : 'normal';

    let roundness = isTileRound ? 'circle' : 'square';
    if (value === TileValue.Destroyed) {
      roundness = 'no-winner';
    }

    return (
      <div
        className={`box ${color} ${roundness}`}
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
