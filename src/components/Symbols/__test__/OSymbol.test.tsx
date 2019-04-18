import * as React from 'react';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { OSymbol } from '../OSymbol';

configure({ adapter: new ReactSixteenAdapter() });

describe('OSymbol', () => {
  it('should not explode', () => {
    const component = shallow(<OSymbol />);
    expect(component).not.toBeNull();
  });

  it('should match snapshot', () => {
    const oSymbol1 = shallow(<OSymbol />);
    expect(oSymbol1).toMatchSnapshot();

    const oSymbol2 = shallow(<OSymbol shouldAnimate={false} />);
    expect(oSymbol2).toMatchSnapshot();

    const oSymbol3 = shallow(<OSymbol bigSymbol={true} />);
    expect(oSymbol3).toMatchSnapshot();
  });

  it('should have i element with some kind of icon', () => {
    const component = shallow(<OSymbol />);
    expect(component.find('i')).toHaveLength(1);
    expect(component.find('i').text()).not.toBeUndefined();
  });

  it('should have icon-o, o and animate-o class by default', () => {
    const component = shallow(<OSymbol />);
    expect(component.find('i').hasClass('icon-o')).toBe(true);
    expect(component.find('i').hasClass('o')).toBe(true);
    expect(component.find('i').hasClass('animate-o')).toBe(true);
    expect(component.find('i').hasClass('big-symbol')).toBe(false);
  });

  it('should have big-symbol and animate-o class with bigSymbol=true', () => {
    const component = shallow(<OSymbol bigSymbol={true} />);
    expect(component.find('i').hasClass('big-symbol')).toBe(true);
    expect(component.find('i').hasClass('animate-o')).toBe(true);
  });

  it(`shouldn't have animate class with shouldAnimate=false`, () => {
    let component = shallow(<OSymbol bigSymbol={true} shouldAnimate={false} />);
    expect(component.find('i').hasClass('animate-o')).toBe(false);

    component = shallow(<OSymbol shouldAnimate={false} />);
    expect(component.find('i').hasClass('animate-o')).toBe(false);
  });
});
