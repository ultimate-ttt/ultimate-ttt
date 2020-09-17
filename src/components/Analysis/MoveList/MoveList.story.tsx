import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { MoveList, MoveListProps } from './MoveList';
import { movesForBoardWithThreeMovesMock } from '../../../__mocks__';
import { IconProvider } from '../../IconProvider';

export default {
  title: 'MoveList',
  component: MoveList,
} as Meta;

export const Default: Story<MoveListProps> = (args) => (
  <IconProvider>
    <div className="moveList">
      <MoveList
        {...args}
        moveForwardInHistory={action('moveForwardInHistory')}
        moveBackwardInHistory={action('moveBackwardInHistory')}
      />
    </div>
  </IconProvider>
);

Default.args = {
  currentMove: 2,
  reversedMoves: movesForBoardWithThreeMovesMock.slice().reverse(),
};
