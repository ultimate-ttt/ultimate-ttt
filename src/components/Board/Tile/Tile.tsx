import * as React from 'react';
import { TileValue } from '../../../state/AppState';
import { XSymbol } from '../../Symbols/XSymbol';
import { OSymbol } from '../../Symbols/OSymbol';
import { DrawSymbol } from '../../Symbols/DrawSymbol';
import styles from './Tile.module.css';
import classNames from 'classnames';

interface TileProps {
  onTileClicked?: () => void;
  value: TileValue;
  isTileRound: boolean;
  isClickable: boolean;
  markSpecially?: boolean;
}

export class Tile extends React.Component<TileProps> {
  getValue = () => {
    const { markSpecially } = this.props;

    let shouldAnimate = true;
    if (markSpecially !== undefined) {
      if (!markSpecially) {
        shouldAnimate = false;
      }
    }

    switch (this.props.value) {
      case TileValue.Cross:
        return <XSymbol shouldAnimate={shouldAnimate} />;
      case TileValue.Circle:
        return <OSymbol shouldAnimate={shouldAnimate} />;
      case TileValue.Destroyed:
        return <DrawSymbol shouldAnimate={shouldAnimate} />;
      default:
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

    const classes = classNames(styles.tile, {
      [styles.indicator]: isClickable && !markSpecially,
      [styles.normal]: !isClickable && !markSpecially,
      [styles.special]: markSpecially,
      [styles.circle]: isTileRound && value !== TileValue.Destroyed,
      [styles.square]: !isTileRound && value !== TileValue.Destroyed,
      [styles.noWinner]: value === TileValue.Destroyed,
    });

    return (
      <div
        className={classes}
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
