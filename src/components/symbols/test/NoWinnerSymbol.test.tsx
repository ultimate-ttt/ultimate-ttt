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

    // TODO snapshot tests.

    it( 'should have i element with some kind of icon', () => {
        const component = shallow( <NoWinnerSymbol/> );
        expect( component.find( 'i' ) ).toHaveLength( 1 );
        expect( component.find( 'i' ).text() ).not.toBeUndefined();
    } );

    it( 'should have icon-no-winner, no-winner and big-symbol class by default', () => {
        const component = shallow( <NoWinnerSymbol/> );
        // TODO: hasClass method
        expect( component.find( '.icon-no-winner' ) ).toHaveLength( 1 );
        expect( component.find( '.big-symbol' ) ).toHaveLength( 1 );
        expect( component.find( '.no-winner' ) ).toHaveLength( 1 );
    } );
} );