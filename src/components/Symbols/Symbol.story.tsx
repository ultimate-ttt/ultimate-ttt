import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { XSymbol } from './XSymbol';
import { OSymbol } from './OSymbol';

const stories = storiesOf('Symbol', module);
stories.addDecorator(withKnobs);

stories.add('XSymbol', () => (
  <div className="small-board">
    <XSymbol bigSymbol={boolean('bigSymbol', false)} />
  </div>
));

stories.add('OSymbol', () => (
  <div className="small-board">
    <OSymbol bigSymbol={boolean('bigSymbol', false)} />
  </div>
));
