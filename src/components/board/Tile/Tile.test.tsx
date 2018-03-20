import * as React from 'react';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { Tile } from './Tile';
import { TileValue } from '../../../state/AppState';

configure( {adapter: new ReactSixteenAdapter()} );

describe( 'Tile', () => {
    it( 'should not explode', () => {
        const component = shallow( <Tile isClickable={true} isCircle={true} value={TileValue.Empty}/> );
        expect( component ).not.toBeNull();
    } );

    it('should display an XSymbol if the value is X', () => {

    });

    it('should display an OSymbol if the value is X', () => {

    });

    it('should display nothing if the value is empty', () => {

    });

    it('should display a no winner symbol if the value is destroyed', () => {

    });

    it('should have a big XSymbol child if it is big and the Value is X', () => {

    });

    it('should have a big OSymbol child if it is big and the Value is X', () => {

    });

    it('should call the click method if it is clickable and it was clicked', () => {

    });

    it('should NOT call the click method if it is clicked and it is not clickable', () => {

    });

    it('should have the square class if it is not a circle', () => {

    });

    it('should have the circle class if it is a circle', () => {

    });

    it('should have the no-winner class if the tileValue is Destroyed', () => {

    });

    it('should have the indicator class if it is clickable', () => {

    });

    it('should have the normal class if it is not clickable', () => {

    });
});