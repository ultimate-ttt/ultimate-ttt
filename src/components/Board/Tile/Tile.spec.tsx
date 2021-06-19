import '../../../styles'; // TODO clean up this import later

import * as React from 'react';
import { mount } from '@cypress/react';
import { TileValue } from '../../../state/AppState';
import { Tile } from './Tile';

it('Tile', () => {
  const props = {
    value: TileValue.Cross,
    onTileClicked: () => {},
    isTileRound: false,
    clickable: true,
    highlight: false,
  };
  mount(<Tile {...props} value={TileValue.Cross} />);

  cy.findByRole('button').matchImageSnapshot();
});
