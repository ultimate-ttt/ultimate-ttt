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

    it( 'should match snapshot', () => {
        const xSymbol1 = shallow( <XSymbol/> );
        expect( xSymbol1 ).toMatchSnapshot();

        const xSymbol2 = shallow( <XSymbol shouldAnimate={false}/> );
        expect( xSymbol2 ).toMatchSnapshot();

        const xSymbol3 = shallow(<XSymbol bigSymbol={true}/>);
        expect(xSymbol3).toMatchSnapshot();
    } );

    it( 'should have i element with some kind of icon', () => {
        const component = shallow( <XSymbol/> );
        expect( component.find( 'i' ) ).toHaveLength( 1 );
        expect( component.find( 'i' ).text() ).not.toBeUndefined();
    } );

    it( 'should have icon-x, x and animate-x class by default', () => {
        const component = shallow( <XSymbol/> );
        expect(component.find('i').hasClass('icon-x')).toBe(true);
        expect(component.find('i').hasClass('x')).toBe(true);
        expect(component.find('i').hasClass('animate-x')).toBe(true);
        expect(component.find('i').hasClass('big-symbol')).toBe(false);
    } );

    it( 'should have animate-x and big-symbol class with bigSymbol=true', () => {
        const component = shallow( <XSymbol bigSymbol={true}/> );
        expect(component.find('i').hasClass('big-symbol')).toBe(true);
        expect(component.find('i').hasClass('animate-x')).toBe(true);
    } );

    it( `shouldn't have animate classes with shouldAnimate=false`, () => {
        let component = shallow( <XSymbol bigSymbol={true} shouldAnimate={false}/> );
        expect(component.find('i').hasClass('animate-x')).toBe(false);

        component = shallow( <XSymbol shouldAnimate={false}/> );
        expect(component.find('i').hasClass('animate-x')).toBe(false);
    } );
} );