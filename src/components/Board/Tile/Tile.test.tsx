import * as React from 'react';
import { render, screen } from '../../../test-utils';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './Tile.story';
const { Empty, EmptyClickable, Cross, Circle, Destroyed } =
  composeStories(stories);

test('renders value empty', () => {
  render(<Empty />);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('renders value X', () => {
  render(<Cross />);
  expect(screen.getByRole('button', { name: /x/i })).toBeInTheDocument();
});

test('renders value O', () => {
  render(<Circle />);
  expect(screen.getByRole('button', { name: /o/i })).toBeInTheDocument();
});

test('renders value -', () => {
  render(<Destroyed />);
  expect(screen.getByRole('button', { name: /-/i })).toBeInTheDocument();
});

test('allows clicking button', () => {
  const onClick = jest.fn();
  render(<EmptyClickable onTileClicked={onClick} />);

  const button = screen.getByRole('button');
  userEvent.click(button);
  expect(onClick).toHaveBeenCalledTimes(1);
});

test('doesnt allow clicking button when clickable is false', () => {
  const onClick = jest.fn();
  render(<Empty />);

  const button = screen.getByRole('button');
  userEvent.click(button);
  expect(onClick).not.toHaveBeenCalled();
});
