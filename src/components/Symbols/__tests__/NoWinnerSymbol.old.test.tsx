import * as React from 'react';
import { shallow } from 'enzyme';
import { DrawSymbol } from '../DrawSymbol';

describe('DrawSymbol', () => {
  it('should not explode', () => {
    const component = shallow(<DrawSymbol />);
    expect(component).not.toBeNull();
  });

  it('should match snapshot, animate true', () => {
    const noWinnerSymbol = shallow(<DrawSymbol shouldAnimate={true} />);
    expect(noWinnerSymbol).toMatchSnapshot();
  });

  it('should match snapshot, animate false', () => {
    const noWinnerSymbolNoAnimate = shallow(
      <DrawSymbol shouldAnimate={false} />,
    );
    expect(noWinnerSymbolNoAnimate).toMatchSnapshot();
  });

  it('should have a child element', () => {
    const component = shallow(<DrawSymbol />);
    expect(component).toHaveLength(1);
  });

  it('should have animateDraw and noWinner class by default', () => {
    const component = shallow(<DrawSymbol />);

    expect(component.hasClass('draw')).toBe(true);
    expect(component.hasClass('animateDraw')).toBe(true);
  });

  it('shouldnt have animate class with animate false', () => {
    const component = shallow(<DrawSymbol shouldAnimate={false} />);

    expect(component.hasClass('animateDraw')).toBe(false);
  });
});
