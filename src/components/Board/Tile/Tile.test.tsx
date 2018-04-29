import * as React from 'react';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { Tile } from './Tile';
import { TileValue } from '../../../state/AppState';

configure( {adapter: new ReactSixteenAdapter()} );

describe( 'Tile', () => {
    it( 'should not explode', () => {
        const component = shallow( <Tile isClickable={true} isTileRound={true} value={TileValue.Empty}/> );
        expect( component ).not.toBeNull();
    } );

    describe( 'display of symbol', () => {
        it( 'should display an XSymbol if the value is X', () => {
            const component = shallow( <Tile isClickable={false} isTileRound={true} value={TileValue.Cross}/> );
            expect( component.children( 'XSymbol' ) ).toHaveLength( 1 );
        } );

        it( 'should display an OSymbol if the value is O', () => {
            const component = shallow( <Tile isClickable={false} isTileRound={true} value={TileValue.Circle}/> );
            expect( component.children( 'OSymbol' ) ).toHaveLength( 1 );
        } );

        it( 'should display nothing if the value is empty', () => {
            const component = shallow( <Tile isClickable={false} isTileRound={true} value={TileValue.Empty}/> );
            expect( component.children() ).toHaveLength( 0 );
        } );

        it( 'should display a no winner symbol if the value is destroyed', () => {
            const component = shallow( <Tile isClickable={false} isTileRound={true} value={TileValue.Destroyed}/> );
            expect( component.children( 'NoWinnerSymbol' ) ).toHaveLength( 1 );
        } );

        it( 'should have a big XSymbol child if it is big and the Value is X', () => {
            const component = shallow( (
                                           <Tile
                                               isClickable={false}
                                               isTileRound={true}
                                               isBig={true}
                                               value={TileValue.Cross}
                                           />)
            );
            expect( component.children( 'XSymbol' ) ).toHaveLength( 1 );
            expect( component.children( 'XSymbol' ).prop( 'bigSymbol' ) ).toEqual( true );
        } );

        it( 'should have a big OSymbol child if it is big and the Value is O', () => {
            const component = shallow( (
                                           <Tile
                                               isClickable={false}
                                               isTileRound={true}
                                               isBig={true}
                                               value={TileValue.Circle}
                                           />)
            );
            expect( component.children( 'OSymbol' ) ).toHaveLength( 1 );
            expect( component.children( 'OSymbol' ).prop( 'bigSymbol' ) ).toEqual( true );
        } );
    } );

    describe( 'click event', () => {
        it( 'should call the click method if it is clickable and it was clicked', () => {
            // tslint:disable:no-empty
            const tileClicked = jest.fn( () => {

            } );
            const component = shallow( (
                                           <Tile
                                               isClickable={true}
                                               isTileRound={true}
                                               value={TileValue.Empty}
                                               onTileClicked={tileClicked}
                                           />) );

            component.simulate( 'click' );
            expect( tileClicked ).toHaveBeenCalledTimes( 1 );
        } );

        it( 'should NOT call the click method if it is clicked and it is not clickable', () => {
            const tileClicked = jest.fn( () => {
            } );
            const component = shallow( (
                                           <Tile
                                               isClickable={false}
                                               isTileRound={true}
                                               value={TileValue.Empty}
                                               onTileClicked={tileClicked}
                                           />) );

            component.simulate( 'click' );
            expect( tileClicked ).toHaveBeenCalledTimes( 0 );
        } );
    } );

    describe( 'how rounded it should be shown', () => {
        it( 'should have the square class if it is not a circle', () => {
            const component = shallow( <Tile isClickable={true} isTileRound={false} value={TileValue.Empty}/> );
            expect( component.hasClass( 'square' ) ).toBe( true );
            expect( component.hasClass( 'circle' ) ).toBe( false );
            expect( component.hasClass( 'no-winner' ) ).toBe( false );
        } );

        it( 'should have the circle class if it is a circle', () => {
            const component = shallow( <Tile isClickable={true} isTileRound={true} value={TileValue.Empty}/> );
            expect( component.hasClass( 'circle' ) ).toBe( true );
            expect( component.hasClass( 'square' ) ).toBe( false );
            expect( component.hasClass( 'no-winner' ) ).toBe( false );
        } );

        it( 'should have the no-winner class if the tileValue is Destroyed', () => {
            let component = shallow( <Tile isClickable={true} isTileRound={true} value={TileValue.Destroyed}/> );
            expect( component.hasClass( 'no-winner' ) ).toBe( true );
            expect( component.hasClass( 'circle' ) ).toBe( false );
            expect( component.hasClass( 'square' ) ).toBe( false );

            component = shallow( <Tile isClickable={true} isTileRound={false} value={TileValue.Destroyed}/> );
            expect( component.hasClass( 'no-winner' ) ).toBe( true );
            expect( component.hasClass( 'circle' ) ).toBe( false );
            expect( component.hasClass( 'square' ) ).toBe( false );
        } );
    } );

    describe( 'indicator or no indicator', () => {
        it( 'should have the indicator class if it is clickable', () => {
            const component = shallow( <Tile isClickable={true} isTileRound={true} value={TileValue.Empty}/> );
            expect( component.hasClass( 'indicator' ) ).toBe( true );
            expect( component.hasClass( 'normal' ) ).toBe( false );
        } );

        it( 'should have the normal class if it is not clickable', () => {
            const component = shallow( <Tile isClickable={false} isTileRound={true} value={TileValue.Empty}/> );
            expect( component.hasClass( 'normal' ) ).toBe( true );
            expect( component.hasClass( 'indicator' ) ).toBe( false );
        } );
    } );

} );