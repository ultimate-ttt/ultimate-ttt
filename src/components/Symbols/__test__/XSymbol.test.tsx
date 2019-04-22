import * as React from 'react';
import { shallow } from 'enzyme';
import { XSymbol } from '../XSymbol';

describe('XSymbol', () => {
  it('should not explode', () => {
    const component = shallow(<XSymbol />);
    expect(component).not.toBeNull();
  });

  it('should match snapshot', () => {
    const xSymbol1 = shallow(<XSymbol />);
    expect(xSymbol1).toMatchSnapshot();

    const xSymbol2 = shallow(<XSymbol shouldAnimate={false} />);
    expect(xSymbol2).toMatchSnapshot();
  });

  it('should have a child element', () => {
    const component = shallow(<XSymbol />);
    expect(component).toHaveLength(1);
  });

  it('should have x and animateX class by default', () => {
    const component = shallow(<XSymbol />);
    expect(component.hasClass('x')).toBe(true);
    expect(component.hasClass('animateX')).toBe(true);
  });

  it(`shouldn't have animate classes with shouldAnimate=false`, () => {
    const component = shallow(<XSymbol shouldAnimate={false} />);
    expect(component.hasClass('animateX')).toBe(false);
  });
});
