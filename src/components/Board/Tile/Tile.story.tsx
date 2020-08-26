import * as React from 'react';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Tile } from './Tile';
import { TileValue } from '../../../state/AppState';
import { action } from '@storybook/addon-actions';
import styles from '../SmallBoard/SmallBoard.module.css';

const stories = storiesOf('Tile', module);
stories.addDecorator(withKnobs);

const position = {
  tilePosition: { x: 0, y: 0 },
  boardPosition: { x: 0, y: 0 },
};

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
      clickable={boolean('clickable', false)}
      animate={boolean('animate', true)}
      highlight={boolean('higlight', false)}
      position={position}
    />
  </div>
));

stories.add('Tile Clickable', () => (
  <div className={styles.smallBoard}>
    <Tile
      value={TileValue.Empty}
      isTileRound={boolean('isTileRound', false)}
      onTileClicked={action('onTileClicked')}
      clickable={true}
      animate={boolean('animate', true)}
      position={position}
    />
  </div>
));

stories.add('Tile Marked Specially', () => (
  <div className={styles.smallBoard}>
    <Tile
      value={TileValue.Empty}
      isTileRound={boolean('isTileRound', false)}
      onTileClicked={action('onTileClicked')}
      clickable={boolean('clickable', false)}
      highlight={true}
      animate={boolean('animate', true)}
      position={position}
    />
  </div>
));

stories.add('Tile Circle', () => (
  <div className={styles.smallBoard}>
    <Tile
      value={TileValue.Circle}
      isTileRound={boolean('isTileRound', false)}
      onTileClicked={action('onTileClicked')}
      clickable={boolean('clickable', false)}
      animate={boolean('animate', true)}
      position={position}
    />
  </div>
));

stories.add('Tile Cross', () => (
  <div className={styles.smallBoard}>
    <Tile
      value={TileValue.Cross}
      isTileRound={boolean('isTileRound', false)}
      onTileClicked={action('onTileClicked')}
      clickable={boolean('clickable', false)}
      animate={boolean('animate', true)}
      position={position}
    />
  </div>
));

stories.add('Tile Destroyed', () => (
  <div className={styles.smallBoardFinished}>
    <Tile
      value={TileValue.Destroyed}
      isTileRound={boolean('isTileRound', false)}
      onTileClicked={action('onTileClicked')}
      clickable={boolean('clickable', false)}
      animate={boolean('animate', true)}
      position={position}
    />
  </div>
));
