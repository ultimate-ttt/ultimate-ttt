import * as React from 'react';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { XSymbol } from './XSymbol';
import { OSymbol } from './OSymbol';
import { DrawSymbol } from './DrawSymbol';
import './Symbols.module.css';

const stories = storiesOf('Symbol', module).addParameters({
  backgrounds: [{ name: 'tile', value: '#008891', default: true }],
});
stories.addDecorator(withKnobs);

stories.add('XSymbol', () => (
  <XSymbol shouldAnimate={boolean('shouldAnimate', true)} />
));

stories.add('OSymbol', () => (
  <OSymbol shouldAnimate={boolean('shouldAnimate', true)} />
));

stories.add('DrawSymbol', () => (
  <DrawSymbol shouldAnimate={boolean('shouldAnimate', true)} />
));
