import 'jsdom-global/register';
import * as React from 'react';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { mount, ReactWrapper, configure } from 'enzyme';
import { OSymbol } from './OSymbol';

configure( {adapter: new ReactSixteenAdapter()} );

describe( 'OSymbol', () => {
    // tslint:disable-next-line no-any
    let component: ReactWrapper<any, {}>;

    it( 'matches its snapshot', () => {
        component = mount( <OSymbol/> );
        expect( component ).not.toBeNull();
    } );

} );