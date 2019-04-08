import { configure } from '@storybook/react'

import '../src/index.css';
import '../src/components/Board/SmallBoard/SmallBoard.css';
import '../src/components/Board/Tile/Tile.css';
import '../src/components/Board/BigBoard/BigBoard.css';

const req = require.context('../src', true, /\.story\.(ts|tsx)$/)

configure(() => {
  req.keys().forEach(filename => req(filename))
}, module);
