import * as React from 'react';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Tile } from './Tile';
import { TileValue } from '../../../state/AppState';
import { action } from '@storybook/addon-actions';
import './Tile.module.css';
import styles from '../SmallBoard/SmallBoard.module.css';

const stories = storiesOf('Tile', module);
stories.addDecorator(withKnobs);

const tileValues = {
  Empty: TileValue.Empty,
  Cross: TileValue.Cross,
  Circle: TileValue.Circle,
  Destroyed: TileValue.Destroyed,
};

stories.add('Tile Customisable', () => (
  <div className={styles.smallBoard}>
    <Tile
      value={select('Value', tileValues, TileValue.Empty)}
      isTileRound={boolean('isTileRound', false)}
      onTileClicked={action('onTileClicked')}
      isClickable={boolean('isClickable', false)}
      markSpecially={boolean('markSpecially', false)}
    />
  </div>
));

stories.add('Tile Clickable', () => (
  <div className={styles.smallBoard}>
    <Tile
      value={TileValue.Empty}
      isTileRound={boolean('isTileRound', false)}
      onTileClicked={action('onTileClicked')}
      isClickable={true}
    />
  </div>
));

stories.add('Tile Marked Specially', () => (
  <div className={styles.smallBoard}>
    <Tile
      value={TileValue.Empty}
      isTileRound={boolean('isTileRound', false)}
      onTileClicked={action('onTileClicked')}
      isClickable={boolean('isClickable', false)}
      markSpecially={true}
    />
  </div>
));

stories.add('Tile Circle', () => (
  <div className={styles.smallBoard}>
    <Tile
      value={TileValue.Circle}
      isTileRound={boolean('isTileRound', false)}
      onTileClicked={action('onTileClicked')}
      isClickable={boolean('isClickable', false)}
    />
  </div>
));

stories.add('Tile Cross', () => (
  <div className={styles.smallBoard}>
    <Tile
      value={TileValue.Cross}
      isTileRound={boolean('isTileRound', false)}
      onTileClicked={action('onTileClicked')}
      isClickable={boolean('isClickable', false)}
    />
  </div>
));

stories.add('Tile Destroyed', () => (
  <div className={styles.smallBoardFinished}>
    <Tile
      value={TileValue.Destroyed}
      isTileRound={boolean('isTileRound', false)}
      onTileClicked={action('onTileClicked')}
      isClickable={boolean('isClickable', false)}
    />
  </div>
));
