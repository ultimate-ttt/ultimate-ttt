import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { number, withKnobs } from '@storybook/addon-knobs';
import { Paging } from './Paging';
import { action } from '@storybook/addon-actions';

const stories = storiesOf('Paging', module);
stories.addDecorator(withKnobs);

stories.add('Paging Standard', () => (
  <Paging
    pages={number('pages', 10)}
    currentPage={number('currentPage', 5)}
    onPageChange={action('onPageChange')}
  />
));

stories.add('Paging without all Pages', () => (
  <Paging
    pages={number('pages', 10)}
    currentPage={number('currentPage', 5)}
    onPageChange={action('onPageChange')}
    pagesToDisplayFrom={number('pagesToDisplayFrom', 1)}
    pagesToDisplayTo={number('pagesToDisplayTo', 8)}
  />
));
