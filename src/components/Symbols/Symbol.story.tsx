import * as React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { XSymbol } from './XSymbol';
import { OSymbol } from './OSymbol';
import { DrawSymbol } from './DrawSymbol';

export default {
  title: 'Symbol',
  parameters: {
    backgrounds: {
      default: 'tile',
      values:  [
        { name: 'tile', value: '#008891' }
      ]
    }
  }
}

export const X: React.SFC<{}> = () => <XSymbol shouldAnimate={boolean('shouldAnimate', true)} />
export const O: React.SFC<{}> = () => <OSymbol shouldAnimate={boolean('shouldAnimate', true)} />
export const Draw: React.SFC<{}> = () => <DrawSymbol shouldAnimate={boolean('shouldAnimate', true)} />