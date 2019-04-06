import * as React from 'react';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { NoWinnerSymbol } from '../NoWinnerSymbol';

configure({ adapter: new ReactSixteenAdapter() });

describe('NoWinnerSymbol', () => {
  it('should not explode', () => {
    const component = shallow(<NoWinnerSymbol />);
    expect(component).not.toBeNull();
  });

  it('should match snapshot, animate true', () => {
    const noWinnerSymbol = shallow(<NoWinnerSymbol shouldAnimate={true} />);
    expect(noWinnerSymbol).toMatchSnapshot();
  });

  it('should match snapshot, animate false', () => {
    const noWinnerSymbolNoAnimate = shallow(
      <NoWinnerSymbol shouldAnimate={false} />,
    );
    expect(noWinnerSymbolNoAnimate).toMatchSnapshot();
  });

  it('should have i element with some kind of icon', () => {
    const component = shallow(<NoWinnerSymbol />);
    expect(component.find('i')).toHaveLength(1);
    expect(component.find('i').text()).not.toBeUndefined();
  });

  it('should have icon-no-winner, animate-no-winner, no-winner and big-symbol class by default', () => {
    const component = shallow(<NoWinnerSymbol />);

    const noWinnerSymbol = component.find('i');
    expect(noWinnerSymbol.hasClass('icon-no-winner')).toBe(true);
    expect(noWinnerSymbol.hasClass('big-symbol')).toBe(true);
    expect(noWinnerSymbol.hasClass('no-winner')).toBe(true);
    expect(noWinnerSymbol.hasClass('animate-no-winner')).toBe(true);
  });

  it('shouldnt have animate class with animate false', () => {
    const component = shallow(<NoWinnerSymbol shouldAnimate={false} />);

    const noWinnerSymbol = component.find('i');
    expect(noWinnerSymbol.hasClass('animate-no-winner')).toBe(false);
  });
});
