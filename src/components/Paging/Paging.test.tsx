import * as React from 'react';
import { shallow } from 'enzyme';
import { Paging } from './Paging';
import { Button } from '@rmwc/button';

describe('Paging', () => {
  it('should render all pages', () => {
    const onPageChange = jest.fn(() => {});
    const paging = shallow(
      <Paging pages={10} pageToStartWith={1} onPageChange={onPageChange} />,
    );

    expect(paging.find(Button)).toHaveLength(10);
  });

  it('should call onPageChange function when page Button is clicked', () => {
    const onPageChange = jest.fn(() => {});
    const paging = shallow(
      <Paging pages={10} pageToStartWith={1} onPageChange={onPageChange} />,
    );

    paging.find({ label: 5 }).simulate('click');
    expect(onPageChange).toHaveBeenCalledWith(5);
  });
});
