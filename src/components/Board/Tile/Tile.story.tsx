import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Tile } from './Tile';
import { TileValue } from '../../../state/AppState';

const stories = storiesOf( 'Tile', module );
stories.addDecorator( withKnobs );

const tileValues = {
    Empty: TileValue.Empty,
    Cross: TileValue.Cross,
    Circle: TileValue.Circle,
    Destroyed: TileValue.Destroyed
};

stories.add( 'Tile Customisable', () => (
    <div className="small-board">
        <Tile
            value={select( 'Value', tileValues, TileValue.Empty )}
            isTileRound={boolean( 'isTileRound', false )}
            onTileClicked={() => {
                console.log( 'Tile Clicked' );
            }}
            isClickable={boolean( 'isClickable', false )}
        />
    </div>
) );

stories.add( 'Tile Clickable', () => (
    <div className="small-board">
        <Tile
            value={TileValue.Empty}
            isTileRound={boolean( 'isTileRound', false )}
            onTileClicked={() => {
                console.log( 'Tile Clicked' );
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
            isClickable={boolean( 'isClickable', false )}
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
            isClickable={boolean( 'isClickable', false )}
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
            isClickable={boolean( 'isClickable', false )}
        />
    </div>
) );