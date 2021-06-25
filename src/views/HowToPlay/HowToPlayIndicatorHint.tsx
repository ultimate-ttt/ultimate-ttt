import * as React from 'react';
import styles from './HowToPlayDialog.module.css';
import { Tile } from '../../components/Board/Tile/Tile';
import { TileValue } from '../../state/AppState';

export function HowToPlayIndicatorHint() {
  return (
    <div className={styles.howToPlayIndicator}>
      <Tile
        value={TileValue.Empty}
        isTileRound={false}
        clickable={true}
        animate={false}
      />
    </div>
  );
}
