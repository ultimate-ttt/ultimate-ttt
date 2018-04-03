import * as React from 'react';
import { configure, shallow } from 'enzyme';
import { SmallBoard } from './SmallBoard';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { Player, TileValue } from '../../../state/AppState';
import { Point } from '../../../util/Point';

configure( {adapter: new ReactSixteenAdapter()} );

function getSmallTile( boardPosition: Point, position: Point, value: TileValue ) {
    return {
        boardPosition, position, value
    };
}

describe( 'SmallBoard', () => {
    it( 'should not explode', () => {
        // tslint:disable:no-empty
        const clicked = jest.fn( () => {

        } );

        const boardPosition = {x: 0, y: 0};
        // TODO: switch x and y in some of the tiles? Depends on issue #22
        const smallTileInformation = [
            getSmallTile( boardPosition, {x: 0, y: 0}, TileValue.Empty ),
            getSmallTile( boardPosition, {x: 0, y: 1}, TileValue.Empty ),
            getSmallTile( boardPosition, {x: 0, y: 2}, TileValue.Empty ),
            getSmallTile( boardPosition, {x: 1, y: 0}, TileValue.Empty ),
            getSmallTile( boardPosition, {x: 1, y: 1}, TileValue.Empty ),
            getSmallTile( boardPosition, {x: 1, y: 2}, TileValue.Empty ),
            getSmallTile( boardPosition, {x: 2, y: 0}, TileValue.Empty ),
            getSmallTile( boardPosition, {x: 2, y: 1}, TileValue.Empty ),
            getSmallTile( boardPosition, {x: 2, y: 2}, TileValue.Empty ),
        ];
        const component = shallow( (
                                       <SmallBoard
                                           onTileClicked={clicked}
                                           winningPlayer={TileValue.Empty}
                                           tiles={smallTileInformation}
                                           currentPlayer={Player.Cross}
                                           isMoveAllowed={true}
                                           x={0}
                                           y={0}
                                       />
                                   ) );

        expect( component ).not.toBeNull();
    } );

    describe('unfinished smallboard', () => {
        it( 'should display 9 tiles with the given values', () => {
            // tslint:disable:no-empty
            const clicked = jest.fn( () => {
            } );

            const boardPosition = {x: 1, y: 1};
            const smallTileInformation = [
                getSmallTile( boardPosition, {x: 0, y: 0}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 0, y: 1}, TileValue.Cross ),
                getSmallTile( boardPosition, {x: 0, y: 2}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 1, y: 0}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 1, y: 1}, TileValue.Circle ),
                getSmallTile( boardPosition, {x: 1, y: 2}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 2, y: 0}, TileValue.Cross ),
                getSmallTile( boardPosition, {x: 2, y: 1}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 2, y: 2}, TileValue.Circle ),
            ];
            const component = shallow( (
                                           <SmallBoard
                                               onTileClicked={clicked}
                                               winningPlayer={TileValue.Empty}
                                               tiles={smallTileInformation}
                                               currentPlayer={Player.Cross}
                                               isMoveAllowed={true}
                                               x={1}
                                               y={1}
                                           />) );

            expect( component.children( 'Tile' ) ).toHaveLength( 9 );
            expect( component.children( 'Tile' ).at( 1 ).prop( 'value' ) ).toEqual( TileValue.Cross );
            expect( component.children( 'Tile' ).at( 8 ).prop( 'value' ) ).toEqual( TileValue.Circle );
            expect( component.children( 'Tile' ).findWhere( tile => tile.key().length > 0 ) ).toHaveLength( 9 );
        } );

        it( 'should make tiles not clickable if they are full', () => {
            // tslint:disable:no-empty
            const clicked = jest.fn( () => {
            } );

            const boardPosition = {x: 1, y: 1};
            const smallTileInformation = [
                getSmallTile( boardPosition, {x: 0, y: 0}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 0, y: 1}, TileValue.Cross ),
                getSmallTile( boardPosition, {x: 0, y: 2}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 1, y: 0}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 1, y: 1}, TileValue.Circle ),
                getSmallTile( boardPosition, {x: 1, y: 2}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 2, y: 0}, TileValue.Cross ),
                getSmallTile( boardPosition, {x: 2, y: 1}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 2, y: 2}, TileValue.Circle ),
            ];
            const component = shallow( (
                                           <SmallBoard
                                               onTileClicked={clicked}
                                               winningPlayer={TileValue.Empty}
                                               tiles={smallTileInformation}
                                               currentPlayer={Player.Cross}
                                               isMoveAllowed={true}
                                               x={1}
                                               y={1}
                                           />) );

            expect( component.children( 'Tile' ).at( 1 ).prop( 'isClickable' ) ).toEqual( false );
            expect( component.children( 'Tile' ).at( 4 ).prop( 'isClickable' ) ).toEqual( false );
            expect( component.children( 'Tile' ).at( 8 ).prop( 'isClickable' ) ).toEqual( false );
        } );

        it( 'should make tiles not clickable if the move is not allowed', () => {
            // tslint:disable:no-empty
            const clicked = jest.fn( () => {
            } );

            const boardPosition = {x: 2, y: 2};
            const smallTileInformation = [
                getSmallTile( boardPosition, {x: 0, y: 0}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 0, y: 1}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 0, y: 2}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 1, y: 0}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 1, y: 1}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 1, y: 2}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 2, y: 0}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 2, y: 1}, TileValue.Cross ),
                getSmallTile( boardPosition, {x: 2, y: 2}, TileValue.Circle ),
            ];
            const component = shallow( (
                                           <SmallBoard
                                               onTileClicked={clicked}
                                               winningPlayer={TileValue.Empty}
                                               tiles={smallTileInformation}
                                               currentPlayer={Player.Cross}
                                               isMoveAllowed={false}
                                               x={2}
                                               y={2}
                                           />) );

            expect( component.children( 'Tile' )
                        .findWhere( tile => tile.prop( 'isClickable' ) === false ) )
                .toHaveLength( 9 );
        } );


        it( 'should add isCircle=false when currentPlayer is Cross', () => {
            // tslint:disable:no-empty
            const clicked = jest.fn( () => {
            } );

            const boardPosition = {x: 2, y: 2};
            const smallTileInformation = [
                getSmallTile( boardPosition, {x: 0, y: 0}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 0, y: 1}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 0, y: 2}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 1, y: 0}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 1, y: 1}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 1, y: 2}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 2, y: 0}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 2, y: 1}, TileValue.Cross ),
                getSmallTile( boardPosition, {x: 2, y: 2}, TileValue.Circle ),
            ];
            const component = shallow( (
                                           <SmallBoard
                                               onTileClicked={clicked}
                                               winningPlayer={TileValue.Empty}
                                               tiles={smallTileInformation}
                                               currentPlayer={Player.Cross}
                                               isMoveAllowed={true}
                                               x={2}
                                               y={2}
                                           />) );

            expect( component.children( 'Tile' )
                        .findWhere( tile => tile.prop( 'isCircle' ) === false ) ).toHaveLength( 9 );
        } );

        it( 'should add isCircle=true when currentPlayer is Circle', () => {
            // tslint:disable:no-empty
            const clicked = jest.fn( () => {
            } );

            const boardPosition = {x: 2, y: 2};
            const smallTileInformation = [
                getSmallTile( boardPosition, {x: 0, y: 0}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 0, y: 1}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 0, y: 2}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 1, y: 0}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 1, y: 1}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 1, y: 2}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 2, y: 0}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 2, y: 1}, TileValue.Cross ),
                getSmallTile( boardPosition, {x: 2, y: 2}, TileValue.Circle ),
            ];
            const component = shallow( (
                                           <SmallBoard
                                               onTileClicked={clicked}
                                               winningPlayer={TileValue.Empty}
                                               tiles={smallTileInformation}
                                               currentPlayer={Player.Circle}
                                               isMoveAllowed={true}
                                               x={2}
                                               y={2}
                                           />) );

            expect( component.children( 'Tile' )
                        .findWhere( tile => tile.prop( 'isCircle' ) === true ) ).toHaveLength( 9 );
        } );
    });

    describe('finished smallboard', () => {

        it( 'should only add one tile if the board is won and that should be a big tile', () => {
            // tslint:disable:no-empty
            const clicked = jest.fn( () => {
            } );

            const boardPosition = {x: 2, y: 2};
            const smallTileInformation = [
                getSmallTile( boardPosition, {x: 0, y: 0}, TileValue.Cross ),
                getSmallTile( boardPosition, {x: 0, y: 1}, TileValue.Cross ),
                getSmallTile( boardPosition, {x: 0, y: 2}, TileValue.Cross ),
                getSmallTile( boardPosition, {x: 1, y: 0}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 1, y: 1}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 1, y: 2}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 2, y: 0}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 2, y: 1}, TileValue.Cross ),
                getSmallTile( boardPosition, {x: 2, y: 2}, TileValue.Circle ),
            ];
            const component = shallow( (
                                           <SmallBoard
                                               onTileClicked={clicked}
                                               winningPlayer={TileValue.Cross}
                                               tiles={smallTileInformation}
                                               currentPlayer={Player.Cross}
                                               isMoveAllowed={false}
                                               x={2}
                                               y={2}
                                           />) );

            expect( component.children( 'Tile' ) ).toHaveLength( 1 );
            expect( component.children( 'Tile' ).prop( 'isBig' ) ).toEqual( true );
            expect( component.children( 'Tile' ).prop( 'value' ) ).toEqual( TileValue.Cross );
        } );

    });

    describe('css classes', () => {

        it( 'should have class small-board-finished when small board is finished', () => {
            // tslint:disable:no-empty
            const clicked = jest.fn( () => {
            } );

            const boardPosition = {x: 2, y: 2};
            const smallTileInformation = [
                getSmallTile( boardPosition, {x: 0, y: 0}, TileValue.Cross ),
                getSmallTile( boardPosition, {x: 0, y: 1}, TileValue.Cross ),
                getSmallTile( boardPosition, {x: 0, y: 2}, TileValue.Cross ),
                getSmallTile( boardPosition, {x: 1, y: 0}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 1, y: 1}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 1, y: 2}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 2, y: 0}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 2, y: 1}, TileValue.Cross ),
                getSmallTile( boardPosition, {x: 2, y: 2}, TileValue.Circle ),
            ];
            const component = shallow( (
                                           <SmallBoard
                                               onTileClicked={clicked}
                                               winningPlayer={TileValue.Cross}
                                               tiles={smallTileInformation}
                                               currentPlayer={Player.Cross}
                                               isMoveAllowed={false}
                                               x={2}
                                               y={2}
                                           />) );

            expect( component.hasClass( 'small-board-finished' ) ).toBe( true );
        } );

        it( 'should have class small-board in normal state', () => {
            // tslint:disable:no-empty
            const clicked = jest.fn( () => {
            } );

            const boardPosition = {x: 2, y: 2};
            const smallTileInformation = [
                getSmallTile( boardPosition, {x: 0, y: 0}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 0, y: 1}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 0, y: 2}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 1, y: 0}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 1, y: 1}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 1, y: 2}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 2, y: 0}, TileValue.Empty ),
                getSmallTile( boardPosition, {x: 2, y: 1}, TileValue.Cross ),
                getSmallTile( boardPosition, {x: 2, y: 2}, TileValue.Circle ),
            ];
            const component = shallow( (
                                           <SmallBoard
                                               onTileClicked={clicked}
                                               winningPlayer={TileValue.Empty}
                                               tiles={smallTileInformation}
                                               currentPlayer={Player.Cross}
                                               isMoveAllowed={false}
                                               x={2}
                                               y={2}
                                           />) );

            expect( component.hasClass( 'small-board' ) ).toBe( true );
        } );
    });
} );