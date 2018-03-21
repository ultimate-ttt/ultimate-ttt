import * as React from 'react';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { OSymbol } from '../OSymbol';

configure( {adapter: new ReactSixteenAdapter()} );

describe( 'OSymbol', () => {
    it( 'should not explode', () => {
        const component = shallow( <OSymbol/> );
        expect( component ).not.toBeNull();
    } );

    it( 'should have i element with some kind of icon', () => {
        const component = shallow( <OSymbol/> );
        expect( component.find( 'i' ) ).toHaveLength( 1 );
        expect( component.find( 'i' ).text() ).not.toBeUndefined();
    } );

    it( 'should have material-icons, o and animate-o class by default', () => {
        const component = shallow( <OSymbol/> );
        expect(component.find('i').props().className).toContain('material-icons o animate-o');
        expect( component.find( 'i' ).props().className ).not.toContain( 'big-symbol');
    } );

    it( 'should have animate-o-big-symbol class with and bigSymbol=true', () => {
        const component = shallow( <OSymbol bigSymbol={true}/> );
        expect(component.find('i').props().className).toContain('animate-o-big-symbol');
        expect(component.find('i').props().className).toContain('big-symbol');
        expect( component.find( 'i' ).props().className ).not.toContainEqual( 'animate-o');
    } );
} );