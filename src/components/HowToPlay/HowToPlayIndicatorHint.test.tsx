import * as React from 'react';
import { shallow } from 'enzyme';
import { HowToPlayIndicatorHint } from './HowToPlayIndicatorHint';

describe('HowToPlayIndicatorHint', () => {
  it('should match snapshot', () => {
    const howToPlayIndicatorHint = shallow(<HowToPlayIndicatorHint />);
    expect(howToPlayIndicatorHint).toMatchSnapshot();
  });
});
