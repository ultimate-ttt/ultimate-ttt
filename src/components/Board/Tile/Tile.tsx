import * as React from 'react';
import { TileValue } from '../../../state/AppState';
import { XSymbol } from '../../Symbols/XSymbol';
import { OSymbol } from '../../Symbols/OSymbol';
import { DrawSymbol } from '../../Symbols/DrawSymbol';
import styles from './Tile.module.css';
import classNames from 'classnames';
import { Point } from '../../../util';

interface TileProps {
  onTileClicked?: () => void;
  value: TileValue;
  isTileRound: boolean;
  clickable: boolean;
  markSpecially?: boolean;
  animate?: boolean;
  position: { tilePosition: Point; boardPosition: Point };
}

export function Tile(props: TileProps) {
  const {
    onTileClicked,
    isTileRound,
    clickable,
    value,
    animate,
    markSpecially,
    position,
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

  const valueToString = (value: TileValue) => {
    switch (value) {
      case TileValue.Circle:
        return 'O';
      case TileValue.Cross:
        return 'X';
      case TileValue.Destroyed:
        return 'Draw';
      default:
        return 'Empty';
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
      aria-disabled={!clickable || !onTileClicked}
    >
      {getValue()}
      <span className="sr-only">
        Tile with Content {valueToString(value)} at Position{' '}
        {position.tilePosition.x}/{position.tilePosition.y} on Board{' '}
        {position.boardPosition.x}/{position.boardPosition.y}
        {markSpecially && ', was influenced by currently selected move'}
        {!onTileClicked && clickable && ', move allowed'}
      </span>
    </button>
  );
}
