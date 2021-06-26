import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { MoveList, MoveListProps } from './MoveList';
import { movesForBoardWithThreeMovesMock } from '../../../mocks/board';

export default {
  title: 'MoveList',
  component: MoveList,
  args: {
    onMoveDownwardsInList: action('onMoveDownwardsInList'),
    onMoveUpwardsInList: action('onMoveUpwardsInList'),
  },
} as Meta;

const Template: Story<MoveListProps> = (args) => <MoveList {...args} />;

export const Default = Template.bind({});
Default.args = {
  activatedMove: 2,
  reversedMoves: movesForBoardWithThreeMovesMock.slice().reverse(),
};
