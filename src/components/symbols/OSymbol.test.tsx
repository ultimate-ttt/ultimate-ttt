import * as React from 'react';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { OSymbol } from './OSymbol';

configure( {adapter: new ReactSixteenAdapter()} );

describe( 'OSymbol', () => {
    it( 'should not explode', () => {
        const component = shallow( <OSymbol/> );
        expect( component ).not.toBeNull();
    } );

    it('should have i element with panorama_fish_eye icon', () => {
        const component = shallow(<OSymbol/>);
        expect(component.find('i')).toHaveLength(1);
        expect(component.find('i').text()).toEqual('panorama_fish_eye');
    });

    it('should have material-icons, o and animate-o class', () => {
       const component = shallow(<OSymbol/>);
       expect(component.find('.material-icons .o .animate-o')).toHaveLength(1);
       expect(component.find('.big-symbol')).toHaveLength(0);
    });

    it('should not have animate-o class with shouldAnimate=false', () => {
       const component = shallow(<OSymbol shouldAnimate={false}/>);
       expect(component.find('.animate-o')).toHaveLength(0);
       expect(component.find('.animate-o-big-symbol')).toHaveLength(0);
    });

    it('should have big-symbol class with bigSymbol=true', () => {
       const component = shallow(<OSymbol bigSymbol={true}/> );
       expect(component.find('.big-symbol')).toHaveLength(1);
    });

    it('should have animate-o-big-symbol class with shouldAnimate=true and bigSymbol=true', () => {
        const component = shallow(<OSymbol bigSymbol={true} shouldAnimate={true}/> );
        expect(component.find('.animate-o-big-symbol')).toHaveLength(1);
        expect(component.find('.animate-o')).toHaveLength(0);
        expect(component.find('.big-symbol')).toHaveLength(1);
    });
} );