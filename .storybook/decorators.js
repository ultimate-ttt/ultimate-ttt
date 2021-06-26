import React from 'react';
import { IconProvider } from '../src/components/Icons';

export const decorators = [
  (Story) => (
    <IconProvider>
      <Story />
    </IconProvider>
  ),
];
