import * as React from 'react';
import { Paging, PagingProps } from './Paging';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react/types-6-0';
import { IconProvider } from '../IconProvider';

export default {
  title: 'Paging',
};

export const Standard: Story<PagingProps> = (args) => (
  <IconProvider>
    <Paging {...args} onPageChange={action('onPageChange')} />
  </IconProvider>
);
Standard.args = {
  pages: 10,
  pageToStartWith: 10
};