import { configure } from '@storybook/react'

import '../src/index.css';
import '../src/icons/icons.css';

import '@material/button/dist/mdc.button.min.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import '@material/list/dist/mdc.list.css';
import '@material/card/dist/mdc.card.css';
import '@rmwc/icon/icon.css';
import '@material/typography/dist/mdc.typography.css';

import '../../icons/x.svg';
import '../../icons/o.svg';
import '../../icons/draw.svg';
import '../../icons/arrow-left.svg';
import '../../icons/arrow-right.svg';

const req = require.context('../src', true, /\.story\.(ts|tsx)$/);

configure(() => {
  req.keys().forEach(filename => req(filename))
}, module);
