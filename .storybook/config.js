import { configure } from '@storybook/react'

import '../src/index.css';
import '../src/components/board/SmallBoard/smallboard.css';
import '../src/components/board/Tile/tile.css';
import '../src/components/board/BigBoard/bigboard.css';

const req = require.context('../src', true, /\.story\.(ts|tsx)$/)

configure(() => {
  req.keys().forEach(filename => req(filename))
}, module);
