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

    expect(paging.find(Button)).toHaveLength(10 + 2);
  });

  it('should call onPageChange function when page Button is clicked', () => {
    const onPageChange = jest.fn(() => {});
    const paging = shallow(
      <Paging pages={10} pageToStartWith={1} onPageChange={onPageChange} />,
    );

    paging.find({ label: 5 }).simulate('click');
    expect(onPageChange).toHaveBeenCalledWith(5);
  });

  it('should call onPageChange function when "Previous" Button is clicked', () => {
    const onPageChange = jest.fn(() => {});
    const paging = shallow(
      <Paging pages={10} pageToStartWith={4} onPageChange={onPageChange} />,
    );

    paging.find({ label: 'Previous' }).simulate('click');
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('should call onPageChange function when "Next" Button is clicked', () => {
    const onPageChange = jest.fn(() => {});
    const paging = shallow(
      <Paging pages={10} pageToStartWith={1} onPageChange={onPageChange} />,
    );

    paging.find({ label: 'Next' }).simulate('click');
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
