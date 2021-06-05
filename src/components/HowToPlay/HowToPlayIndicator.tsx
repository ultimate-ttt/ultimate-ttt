import * as React from 'react';
import styles from './HowToPlayDialog.module.css';
import { Tile } from '../Board/Tile/Tile';
import { TileValue } from '../../state/AppState';

// TODO think about naming again
export function HowToPlayIndicator() {
  return (
    <div className={styles.howToPlayIndicator}>
      <Tile value={TileValue.Empty} isTileRound={false} clickable={true} />
    </div>
  );
}
