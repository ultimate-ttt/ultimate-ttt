import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Tile } from './Tile';
import { TileValue } from '../../../state/AppState';

const stories = storiesOf( 'Tile', module );
stories.addDecorator( withKnobs );

// FIXME: enum value not transferred to Tile As Enum
stories.add( 'Tile Customisable', () => (
    <div className="small-board">
        <Tile
            value={select( 'Value', TileValue, TileValue.Empty )}
            isTileRound={boolean( 'isTileRound', false )}
            onTileClicked={() => {
                console.log( 'tile Clicked' );
            }}
            isClickable={boolean( 'Is Clickable', false )}
        />
    </div>
) );

stories.add( 'Tile Clickable', () => (
    <div className="small-board">
        <Tile
            value={TileValue.Empty}
            isTileRound={boolean( 'isTileRound', false )}
            onTileClicked={() => {
                console.log( 'tile Clicked' );
            }}
            isClickable={true}
        />
    </div>
) );

stories.add( 'Tile Circle', () => (
    <div className="small-board">
        <Tile
            value={TileValue.Circle}
            isTileRound={boolean( 'isTileRound', false )}
            onTileClicked={() => {
                console.log( 'tile Clicked' );
            }}
            isClickable={boolean( 'Is Clickable', false )}
        />
    </div>
) );

stories.add( 'Tile Cross', () => (
    <div className="small-board">
        <Tile
            value={TileValue.Cross}
            isTileRound={boolean( 'isTileRound', false )}
            onTileClicked={() => {
                console.log( 'tile Clicked' );
            }}
            isClickable={boolean( 'Is Clickable', false )}
        />
    </div>
) );

stories.add( 'Tile Destroyed', () => (
    <div className="small-board-finished">
        <Tile
            value={TileValue.Destroyed}
            isTileRound={boolean( 'isTileRound', false )}
            onTileClicked={() => {
                console.log( 'tile Clicked' );
            }}
            isClickable={boolean( 'Is Clickable', false )}
        />
    </div>
) );