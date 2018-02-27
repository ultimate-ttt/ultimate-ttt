import { select, withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Tile } from './Tile';
import { TileValue } from '../../../state/AppState';

const stories = storiesOf( 'Tile', module );
stories.addDecorator( withKnobs );

stories.add( 'CiTile', () => (
    <div className="small-board">
        <Tile
            value={select( 'Value', TileValue, TileValue.Empty )}
            isCircle={boolean( 'isCircle', false )}
            onTileClicked={() => {
                console.log( 'tile Clicked' );
            }}
            isClickable={boolean( 'Is Clickable', false )}
        />
    </div>
) );
