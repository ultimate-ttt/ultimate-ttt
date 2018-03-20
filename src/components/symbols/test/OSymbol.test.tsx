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
        expect( component.find( '.material-icons .o .animate-o' ) ).toHaveLength( 1 );
        expect( component.find( '.big-symbol' ) ).toHaveLength( 0 );
    } );

    it( 'should have animate-o-big-symbol class with and bigSymbol=true', () => {
        const component = shallow( <OSymbol bigSymbol={true}/> );
        expect( component.find( '.animate-o-big-symbol' ) ).toHaveLength( 1 );
        expect( component.find( '.animate-o' ) ).toHaveLength( 0 );
        expect( component.find( '.big-symbol' ) ).toHaveLength( 1 );
    } );
} );