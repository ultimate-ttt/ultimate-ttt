import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { IconProvider } from '../Icons';
import { ArrowButtons, ArrowButtonsProps } from './ArrowButtons';

export default {
  title: 'ArrowButtons',
  component: ArrowButtons,
} as Meta;

export const Default: Story<ArrowButtonsProps> = (args) => (
  <IconProvider>
    <div className="historyButtons">
      <ArrowButtons
        {...args}
        onInteraction={(forward) => action('interaction: ' + forward)}
      />
    </div>
  </IconProvider>
);
Default.args = {
  value: 1,
  minValue: 1,
  maxValue: 5,
};
