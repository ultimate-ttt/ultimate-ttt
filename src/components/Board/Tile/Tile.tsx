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
  clickable: boolean;
  markSpecially?: boolean;
  animate?: boolean;
}

export function Tile(props: TileProps) {
  const {
    onTileClicked,
    isTileRound,
    clickable,
    value,
    animate,
    markSpecially,
  } = props;

  const getValue = () => {
    let shouldAnimate = animate;
    if (markSpecially !== undefined) {
      if (!markSpecially) {
        shouldAnimate = false;
      }
    }

    switch (props.value) {
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

  const classes = classNames(styles.tile, {
    [styles.special]: markSpecially,
    [styles.indicator]: clickable && !markSpecially,
    [styles.normal]: !clickable && !markSpecially,
    [styles.animate]: animate !== undefined ? animate : true,
    [styles.noWinner]: value === TileValue.Destroyed,
    [styles.circle]: isTileRound && value !== TileValue.Destroyed,
    [styles.square]: !isTileRound && value !== TileValue.Destroyed,
  });

  return (
    <button
      className={classes}
      onClick={() => {
        if (clickable && onTileClicked) {
          onTileClicked();
        }
      }}
    >
      {getValue()}
    </button>
  );
}
