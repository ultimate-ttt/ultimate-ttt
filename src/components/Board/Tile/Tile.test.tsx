import * as React from 'react';
import { render, screen } from '../../../test-utils';
import userEvent from '@testing-library/user-event';
import { Tile } from './Tile';
import { TileValue } from '../../../state/AppState';

const props = {
  value: TileValue.Cross,
  onTileClicked: () => {},
  isTileRound: false,
  clickable: true,
  highlight: false,
};

test('renders value X', () => {
  render(<Tile {...props} value={TileValue.Cross} />);
  expect(screen.getByRole('button', { name: /x/i })).toBeInTheDocument();
});

test('renders value O', () => {
  render(<Tile {...props} value={TileValue.Circle} />);
  expect(screen.getByRole('button', { name: /o/i })).toBeInTheDocument();
});

test('renders value -', () => {
  render(<Tile {...props} value={TileValue.Destroyed} />);
  expect(screen.getByRole('button', { name: /-/i })).toBeInTheDocument();
});

test('renders value empty', () => {
  render(<Tile {...props} value={TileValue.Empty} />);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('allows clicking button', () => {
  const onClick = jest.fn();
  render(<Tile {...props} onTileClicked={onClick} />);

  const button = screen.getByRole('button');
  userEvent.click(button);
  expect(onClick).toHaveBeenCalledTimes(1);
});

test('doesnt allow clicking button when clickable is false', () => {
  const onClick = jest.fn();
  render(<Tile {...props} clickable={false} onTileClicked={onClick} />);

  const button = screen.getByRole('button');
  userEvent.click(button);
  expect(onClick).not.toHaveBeenCalled();
});
