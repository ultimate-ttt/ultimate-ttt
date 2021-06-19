import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { MoveList, MoveListProps } from './MoveList';
import { movesForBoardWithThreeMovesMock } from '../../../mocks';
import { IconProvider } from '../../Icons';

export default {
  title: 'MoveList',
  component: MoveList,
} as Meta;

export const Default: Story<MoveListProps> = (args) => (
  <IconProvider>
    <div className="moveList">
      <MoveList
        {...args}
        onMoveDownwardsInList={action('onMoveDownwardsInList')}
        onMoveUpwardsInList={action('onMoveUpwardsInList')}
      />
    </div>
  </IconProvider>
);

Default.args = {
  activatedMove: 2,
  reversedMoves: movesForBoardWithThreeMovesMock.slice().reverse(),
};
