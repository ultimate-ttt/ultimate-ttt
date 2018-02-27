import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Tile } from './Tile';
import { Player, TileValue } from '../../../state/AppState';

const stories = storiesOf( 'CiTile', module );
stories.addDecorator( withKnobs );

stories.add( 'CiTile', () => (
   <Tile
       value={select( 'Value', TileValue, TileValue.Empty )}
       currentPlayer={select( 'Current Player', Player, Player.Circle )}
       onTileClicked={() => {console.log('tile Clicked')}}
   />
) );
