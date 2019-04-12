import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { XSymbol } from './XSymbol';
import { OSymbol } from './OSymbol';
import { NoWinnerSymbol } from './NoWinnerSymbol';

const stories = storiesOf('Symbol', module);
stories.addDecorator(withKnobs);

stories.add('XSymbol', () => (
  <XSymbol
    bigSymbol={boolean('bigSymbol', false)}
    shouldAnimate={boolean('shouldAnimate', true)}
  />
));

stories.add('OSymbol', () => (
  <OSymbol
    bigSymbol={boolean('bigSymbol', false)}
    shouldAnimate={boolean('shouldAnimate', true)}
  />
));

stories.add('NoWinnerSymbol', () => (
  <NoWinnerSymbol shouldAnimate={boolean('shouldAnimate', true)} />
));
