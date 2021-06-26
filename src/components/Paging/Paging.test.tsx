import * as React from 'react';
// TODO make this import cleaner
// -> like this probably: https://create-react-app.dev/docs/importing-a-component/#absolute-imports
import { render, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './Paging.story';
const { Standard, Empty, Minimum, Maximum } = composeStories(stories);

test('renders supplied amount of page buttons', () => {
  render(<Standard />);
  const buttons = screen.getAllByRole('button', { name: /\d/ });
  expect(buttons).toHaveLength(10);
});

test('renders no buttons when pages are 0', () => {
  render(<Empty />);
  const buttons = screen.queryAllByRole('button');
  expect(buttons).toHaveLength(0);
});

test('allows using next button', () => {
  const onPageChange = jest.fn();
  render(<Standard onPageChange={onPageChange} />);

  const next = screen.getByRole('button', { name: /next/i });

  const pageSix = screen.getByRole('button', { name: /6/ });
  expect(pageSix.className).not.toMatch(/unelevated/);

  userEvent.click(next);

  expect(pageSix.className).toMatch(/unelevated/);
  expect(onPageChange).toHaveBeenCalledWith(6);
});

test('allows using previous button', () => {
  const onPageChange = jest.fn();
  render(<Standard onPageChange={onPageChange} />);

  const previous = screen.getByRole('button', { name: /previous/i });

  const pageFour = screen.getByRole('button', { name: /4/ });
  expect(pageFour.className).not.toMatch(/unelevated/);

  userEvent.click(previous);

  expect(pageFour.className).toMatch(/unelevated/);
  expect(onPageChange).toHaveBeenCalledWith(4);
});

test('allows using specific page button', () => {
  const onPageChange = jest.fn();
  render(<Standard onPageChange={onPageChange} />);

  const page = screen.getByRole('button', { name: /7/ });
  expect(page.className).not.toMatch(/unelevated/);
  userEvent.click(page);

  expect(onPageChange).toHaveBeenCalledWith(7);
  expect(page.className).toMatch(/unelevated/);
});

test('doesnt allow previous button on Minimum', () => {
  const onPageChange = jest.fn();
  render(<Minimum onPageChange={onPageChange} />);

  const previous = screen.getByRole('button', { name: /previous/i });
  userEvent.click(previous);

  expect(onPageChange).not.toHaveBeenCalled();
});

test('doesnt allow next button on Maximum', () => {
  const onPageChange = jest.fn();
  render(<Maximum onPageChange={onPageChange} />);

  const next = screen.getByRole('button', { name: /next/i });
  userEvent.click(next);

  expect(onPageChange).not.toHaveBeenCalled();
});
