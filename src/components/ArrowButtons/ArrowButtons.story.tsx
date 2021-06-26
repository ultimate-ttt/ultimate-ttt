import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { ArrowButtons, ArrowButtonsProps } from './ArrowButtons';

export default {
  title: 'ArrowButtons',
  component: ArrowButtons,
  args: {
    value: 3,
    minValue: 1,
    maxValue: 5,
    onInteraction: action('interaction'),
  },
} as Meta;

const Template: Story<ArrowButtonsProps> = (args) => <ArrowButtons {...args} />;

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
  },
  rightButtonConfig: {
    buttonProps: {
      raised: false,
      danger: true,
    },
  },
};

export const HideRight = Template.bind({});
HideRight.args = {
  rightButtonConfig: {
    hide: true,
  },
};

export const HideLeft = Template.bind({});
HideRight.args = {
  leftButtonConfig: {
    hide: true,
  },
};

export const WithChildren = Template.bind({});
WithChildren.args = {
  children: <span>This is a child</span>,
};
