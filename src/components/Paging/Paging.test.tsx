import * as React from 'react';
// TODO make this import cleaner
// -> like this probably: https://create-react-app.dev/docs/importing-a-component/#absolute-imports
import { render, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import { Paging } from './Paging';

test('renders supplied amount of page buttons', () => {
  render(<Paging pages={10} pageToStartWith={1} onPageChange={() => {}} />);

  const buttons = screen.getAllByRole('button', { name: /\d/ });
  expect(buttons).toHaveLength(10);
});

test('renders no buttons when pages are 0', () => {
  const onPageChange = jest.fn();
  render(<Paging pages={0} pageToStartWith={0} onPageChange={onPageChange} />);

  const buttons = screen.queryAllByRole('button');
  expect(buttons).toHaveLength(0);
});

test('allows using next button', () => {
  const onPageChange = jest.fn();
  render(<Paging pages={10} pageToStartWith={5} onPageChange={onPageChange} />);

  const next = screen.getByRole('button', { name: /next/i });

  const pageSix = screen.getByRole('button', { name: /6/ });
  expect(pageSix.className).not.toMatch(/unelevated/);

  userEvent.click(next);

  expect(pageSix.className).toMatch(/unelevated/);
  expect(onPageChange).toHaveBeenCalledWith(6);
});

test('allows using previous button', () => {
  const onPageChange = jest.fn();
  render(<Paging pages={10} pageToStartWith={5} onPageChange={onPageChange} />);

  const previous = screen.getByRole('button', { name: /previous/i });

  const pageFour = screen.getByRole('button', { name: /4/ });
  expect(pageFour.className).not.toMatch(/unelevated/);

  userEvent.click(previous);

  expect(pageFour.className).toMatch(/unelevated/);
  expect(onPageChange).toHaveBeenCalledWith(4);
});

test('allows using specific page button', () => {
  const onPageChange = jest.fn();
  render(<Paging pages={10} pageToStartWith={1} onPageChange={onPageChange} />);

  const page = screen.getByRole('button', { name: /5/ });
  expect(page.className).not.toMatch(/unelevated/);
  userEvent.click(page);

  expect(onPageChange).toHaveBeenCalledWith(5);
  expect(page.className).toMatch(/unelevated/);
});
