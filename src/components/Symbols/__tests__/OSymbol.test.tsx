import * as React from 'react';
import { shallow } from 'enzyme';
import { OSymbol } from '../OSymbol';

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
  });

  it('should have a children element', () => {
    const component = shallow(<OSymbol />);
    expect(component).toHaveLength(1);
  });

  it('should have o and animateO class by default', () => {
    const component = shallow(<OSymbol />);
    expect(component.hasClass('o')).toBe(true);
    expect(component.hasClass('animateO')).toBe(true);
  });

  it(`shouldn't have animate class with shouldAnimate=false`, () => {
    const component = shallow(<OSymbol shouldAnimate={false} />);
    expect(component.hasClass('animateO')).toBe(false);
  });
});
