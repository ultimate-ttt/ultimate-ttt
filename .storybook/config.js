import { configure } from '@storybook/react'

import '../src/index.css';
import '../src/components/Board/SmallBoard/SmallBoard.css';
import '../src/components/Board/Tile/Tile.css';
import '../src/components/Board/BigBoard/BigBoard.css';
import '../src/views/Analysis/Game/AnalysisGame.css';

import '@material/button/dist/mdc.button.min.css';
import '@material/list/dist/mdc.list.css';
import '@rmwc/icon/icon.css';

const req = require.context('../src', true, /\.story\.(ts|tsx)$/)

configure(() => {
  req.keys().forEach(filename => req(filename))
}, module);
