import * as React from 'react';
import { XSymbol, XSymbolProps } from './XSymbol';
import { OSymbol, OSymbolProps } from './OSymbol';
import { DrawSymbol, DrawSymbolProps } from './DrawSymbol';
import { Story } from '@storybook/react/types-6-0';

export default {
  title: 'Symbol',
  parameters: {
    backgrounds: {
      default: 'tile',
      values: [{ name: 'tile', value: '#008891' }],
    },
  },
};

export const X: Story<XSymbolProps> = (args) => <XSymbol {...args} />;
X.args = { shouldAnimate: true };

export const O: Story<OSymbolProps> = (args) => <OSymbol {...args} />;
O.args = { shouldAnimate: true };

export const Draw: Story<DrawSymbolProps> = (args) => <DrawSymbol {...args} />;
Draw.args = { shouldAnimate: true };
