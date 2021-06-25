import * as React from 'react';
import { renderWithStore, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import Game from './Game';

test('allows playing according to rules', () => {
  renderWithStore(<Game />);

  const buttons = screen.getAllByRole('button', { name: /^$/ });
  userEvent.click(buttons[0]);
  expect(screen.getByRole('button', { name: /x/i })).toBeInTheDocument();

  const buttonNotClickable = buttons[Math.floor(buttons.length / 2)];
  userEvent.click(buttonNotClickable);
  expect(screen.queryByRole('button', { name: /o/i })).not.toBeInTheDocument();

  userEvent.click(buttons[1]);
  expect(screen.getByRole('button', { name: /o/i })).toBeInTheDocument();
});
