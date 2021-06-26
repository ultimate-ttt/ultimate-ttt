import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { BigBoard, BigBoardProps } from './BigBoard';
import { Player } from '../../../state/AppState';
import {
  circleFinishedBoardMock,
  crossFinishedBoardMock,
  emptyBoardMock,
  unfinishedBoardMock,
} from '../../../mocks/board';
import { action } from '@storybook/addon-actions';

export default {
  title: 'BigBoard',
  component: BigBoard,
  argTypes: {
    currentPlayer: {
      control: {
        type: 'select',
        options: [Player.Cross, Player.Circle],
      },
    },
  },
  args: {
    onPlayerMoved: action('onPlayerMoved'),
  },
} as Meta;

const Template: Story<BigBoardProps> = (args) => <BigBoard {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  currentPlayer: Player.Cross,
  board: emptyBoardMock,
  activeBoards: [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
  ],
  animate: true,
};

export const Unfinished = Template.bind({});
Unfinished.args = {
  currentPlayer: Player.Cross,
  board: unfinishedBoardMock,
  activeBoards: [{ x: 0, y: 2 }],
  animate: true,
};

export const FinishedCircle = Template.bind({});
FinishedCircle.args = {
  currentPlayer: Player.Cross,
  board: circleFinishedBoardMock,
  activeBoards: [],
  animate: true,
};

export const FinishedCross = Template.bind({});
FinishedCross.args = {
  currentPlayer: Player.Circle,
  board: crossFinishedBoardMock,
  activeBoards: [],
  animate: true,
};

export const Highlighted = Template.bind({});
Highlighted.args = {
  currentPlayer: Player.Cross,
  board: circleFinishedBoardMock,
  activeBoards: [],
  animate: true,
  highlight: {
    condition: true,
    position: {
      boardPosition: { x: 2, y: 2 },
      tilePosition: { x: 0, y: 1 },
    },
  },
};
