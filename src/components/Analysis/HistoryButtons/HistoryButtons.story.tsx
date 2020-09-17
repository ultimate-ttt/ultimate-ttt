import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { HistoryButtons, HistoryButtonsProps } from './HistoryButtons';
import { action } from '@storybook/addon-actions';
import { IconProvider } from '../../IconProvider';

export default {
  title: 'HistoryButtons',
  component: HistoryButtons,
} as Meta;

export const Default: Story<HistoryButtonsProps> = (args) => (
  <IconProvider>
    <div className="historyButtons">
      <HistoryButtons
        {...args}
        moveForwardInHistory={action('moveForwardInHistory')}
        moveBackwardInHistory={action('moveBackwardInHistory')}
        onInteraction={action('interaction')}
      />
    </div>
  </IconProvider>
);
Default.args = {
  currentMove: 1,
  lastMove: 5,
};
