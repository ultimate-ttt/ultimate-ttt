import * as React from 'react';
import { mount } from '@cypress/react';
import { TileValue } from '../../../state/AppState';
import { Tile } from './Tile';

// TODO unfortunately with CRA 3 we can't override testMatch and CRA 4 upgrade doesnt work. Renaming file to .cy. for now
const props = {
  value: TileValue.Empty,
  onTileClicked: () => {},
  isTileRound: false,
  clickable: true,
  highlight: false,
};

describe('Tile', () => {
  it('Empty', () => {
    mount(<Tile {...props} />);
    cy.findByRole('button').matchImageSnapshot();
  });

  it('X', () => {
    mount(<Tile {...props} value={TileValue.Cross} clickable={false} />);
    cy.findByRole('button').matchImageSnapshot();
  });

  it('O', () => {
    mount(<Tile {...props} value={TileValue.Circle} clickable={false} />);
    cy.findByRole('button').matchImageSnapshot();
  });

  it('Round', () => {
    mount(<Tile {...props} isTileRound={true} />);
    cy.findByRole('button').matchImageSnapshot();
  });

  it('Highlight', () => {
    mount(<Tile {...props} highlight={true} />);
    cy.findByRole('button').matchImageSnapshot();
  });
});
