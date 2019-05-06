import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { number, withKnobs } from '@storybook/addon-knobs';
import { Paging } from './Paging';
import { action } from '@storybook/addon-actions';
import { IconProvider } from '../IconProvider';

const stories = storiesOf('Paging', module);
stories.addDecorator(withKnobs);

stories.add('Paging Standard', () => (
  <IconProvider>
    <Paging
      pages={number('pages', 10)}
      pageToStartWith={number('pageToStartWith', 5)}
      onPageChange={action('onPageChange')}
    />
  </IconProvider>
));
