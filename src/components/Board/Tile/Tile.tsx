import * as React from 'react';
import { TileValue } from '../../../state/AppState';
import { XSymbol } from '../../Symbols/XSymbol';
import { OSymbol } from '../../Symbols/OSymbol';
import { DrawSymbol } from '../../Symbols/DrawSymbol';
import styles from './Tile.module.css';
import classNames from 'classnames';

export interface TileProps {
  onTileClicked?: () => void;
  value: TileValue;
  isTileRound: boolean;
  clickable: boolean;
  highlight?: boolean;
  animate?: boolean;
}

export function Tile(props: TileProps) {
  const { onTileClicked, isTileRound, clickable, value, animate, highlight } =
    props;

  const getValue = () => {
    let shouldAnimate = animate;
    if (highlight !== undefined) {
      if (!highlight) {
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
    [styles.special]: highlight,
    [styles.indicator]: clickable && !highlight,
    [styles.normal]: !clickable && !highlight,
    [styles.animate]: animate ?? true,
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
      aria-disabled={!clickable || !onTileClicked}
    >
      {getValue()}
    </button>
  );
}
