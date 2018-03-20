import * as React from 'react';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { XSymbol } from '../XSymbol';

configure( {adapter: new ReactSixteenAdapter()} );

describe( 'XSymbol', () => {
    it( 'should not explode', () => {
        const component = shallow( <XSymbol/> );
        expect( component ).not.toBeNull();
    } );

    it( 'should have i element with some kind of icon', () => {
        const component = shallow( <XSymbol/> );
        expect( component.find( 'i' ) ).toHaveLength( 1 );
        expect( component.find( 'i' ).text() ).not.toBeUndefined();
    } );

    it( 'should have material-icons, x and animate-x class by default', () => {
        const component = shallow( <XSymbol/> );
        expect( component.find( '.material-icons .x .animate-x' ) ).toHaveLength( 1 );
        expect( component.find( '.big-symbol' ) ).toHaveLength( 0 );
    } );

    it( 'should have animate-x-big-symbol class with and bigSymbol=true', () => {
        const component = shallow( <XSymbol bigSymbol={true}/> );
        expect( component.find( '.animate-x-big-symbol' ) ).toHaveLength( 1 );
        expect( component.find( '.animate-x' ) ).toHaveLength( 0 );
        expect( component.find( '.big-symbol' ) ).toHaveLength( 1 );
    } );
} );