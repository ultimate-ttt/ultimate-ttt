import * as React from 'react';
import { Tile, TileProps } from './Tile';
import { TileValue } from '../../../state/AppState';
import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';
import styles from '../SmallBoard/SmallBoard.module.css';

export default {
  title: 'Tile',
  component: Tile,
  args: {
    onTileClicked: action('onTileClicked'),
  },
} as Meta;

const Template: Story<TileProps> = (args) => (
  <div className={styles.smallBoard}>
    <Tile {...args} />
  </div>
);

export const Empty = Template.bind({});
Empty.args = {
  value: TileValue.Empty,
  isTileRound: false,
  clickable: false,
};

export const EmptyClickable = Template.bind({});
EmptyClickable.args = {
  value: TileValue.Empty,
  isTileRound: false,
  clickable: true,
};

export const Highlighted = Template.bind({});
Highlighted.args = {
  value: TileValue.Empty,
  isTileRound: false,
  clickable: false,
  highlight: true,
};

export const Circle = Template.bind({});
Circle.args = {
  value: TileValue.Circle,
  isTileRound: false,
  clickable: false,
};

export const Cross = Template.bind({});
Cross.args = {
  value: TileValue.Cross,
  isTileRound: false,
  clickable: false,
};

export const Destroyed = Template.bind({});
Destroyed.args = {
  value: TileValue.Destroyed,
  isTileRound: false,
  clickable: false,
};
