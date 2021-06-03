import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { IconProvider } from '../Icons';
import { ArrowButtons, ArrowButtonsProps } from './ArrowButtons';

export default {
  title: 'ArrowButtons',
  component: ArrowButtons,
  args: {
    value: 3,
    minValue: 1,
    maxValue: 5,
  },
} as Meta;

const Template: Story<ArrowButtonsProps> = (args) => (
  <IconProvider>
    <div className="historyButtons">
      <ArrowButtons {...args} onInteraction={action('interaction')} />
    </div>
  </IconProvider>
);

export const Standard = Template.bind({});

export const Minimum = Template.bind({});
Minimum.args = {
  value: 1,
};
export const Maximum = Template.bind({});
Maximum.args = {
  value: 5,
};

export const WithKeyboard = Template.bind({});
WithKeyboard.args = {
  handleKeyboard: true,
};

export const WithCustomProps = Template.bind({});
WithCustomProps.args = {
  leftButtonConfig: {
    buttonProps: {
      raised: false,
      danger: true,
    },
    text: 'Custom Left Text',
  },
  rightButtonConfig: {
    buttonProps: {
      raised: false,
      danger: true,
    },
    text: 'Custom Right Text',
  },
};

export const WithChildren = Template.bind({});
WithChildren.args = {
  children: <span>This is a child</span>,
};
