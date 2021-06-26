import * as React from 'react';
import { Paging, PagingProps } from './Paging';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react/types-6-0';

export default {
  title: 'Paging',
  component: Paging,
  args: {
    pages: 10,
    pageToStartWith: 5,
    onPageChange: action('onPageChange'),
  },
} as Meta;

const Template: Story<PagingProps> = (args) => <Paging {...args} />;

export const Standard = Template.bind({});

export const Empty = Template.bind({});
Empty.args = {
  pages: 0,
};

export const Maximum = Template.bind({});
Maximum.args = {
  pageToStartWith: 10,
};

export const Minimum = Template.bind({});
Minimum.args = {
  pageToStartWith: 1,
};
