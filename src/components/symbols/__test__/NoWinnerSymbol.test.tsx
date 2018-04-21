import * as React from 'react';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { NoWinnerSymbol } from '../NoWinnerSymbol';

configure( {adapter: new ReactSixteenAdapter()} );

describe( 'NoWinnerSymbol', () => {
    it( 'should not explode', () => {
        const component = shallow( <NoWinnerSymbol/> );
        expect( component ).not.toBeNull();
    } );

    it( 'should match snapshot', () => {
        const noWinnerSymbol = shallow( <NoWinnerSymbol/> );
        expect( noWinnerSymbol ).toMatchSnapshot();
    } );

    it( 'should have i element with some kind of icon', () => {
        const component = shallow( <NoWinnerSymbol/> );
        expect( component.find( 'i' ) ).toHaveLength( 1 );
        expect( component.find( 'i' ).text() ).not.toBeUndefined();
    } );

    it( 'should have icon-no-winner, no-winner and big-symbol class by default', () => {
        const component = shallow( <NoWinnerSymbol/> );
        expect( component.find( 'i' ).hasClass('icon-no-winner')).toBe(true);
        expect( component.find( 'i' ).hasClass('big-symbol')).toBe(true);
        expect( component.find( 'i' ).hasClass('no-winner') ).toBe(true);
    } );
} );