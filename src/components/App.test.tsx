import * as React from 'react';
import { App } from './App';
import { shallow } from 'enzyme';

describe('App', () => {
  it('should not explode', () => {
    const app = shallow(<App />);
    expect(app).not.toBeNull();
  });
});
