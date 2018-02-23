import * as React from 'react';
import * as Enzyme from 'enzyme';
import { OSymbol } from './OSymbol';
import { shallowToJson } from 'enzyme-to-json';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

describe( 'OSymbol', () => {
    it('matches its snapshot', () => {
        Enzyme.configure({ adapter: new Adapter() });

        const osymbol = shallow(<OSymbol/>);
        expect(shallowToJson(osymbol)).toMatchSnapshot();
    });
});