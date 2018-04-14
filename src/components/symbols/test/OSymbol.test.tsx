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
        expect(component.find('i').hasClass('material-icons')).toBe(true);
        expect(component.find('i').hasClass('o')).toBe(true);
        expect(component.find('i').hasClass('animate-o')).toBe(true);
        expect(component.find('i').hasClass('big-symbol')).toBe(false);
    } );

    it( 'should have animate-o-big-symbol class with and bigSymbol=true', () => {
        const component = shallow( <OSymbol bigSymbol={true}/> );
        expect(component.find('i').hasClass('animate-o-big-symbol')).toBe(true);
        expect(component.find('i').hasClass('big-symbol')).toBe(true);
        expect(component.find('i').hasClass('animate-o')).toBe(false);
    } );

    it( `shouldn't have animate classes with shouldAnimate=false`, () => {
        let component = shallow( <OSymbol bigSymbol={true} shouldAnimate={false}/> );
        expect(component.find('i').hasClass('animate-o-big-symbol')).toBe(false);
        expect(component.find('i').hasClass('animate-o')).toBe(false);

        component = shallow( <OSymbol shouldAnimate={false}/> );
        expect(component.find('i').hasClass('animate-o-big-symbol')).toBe(false);
        expect(component.find('i').hasClass('animate-o')).toBe(false);
    } );
} );