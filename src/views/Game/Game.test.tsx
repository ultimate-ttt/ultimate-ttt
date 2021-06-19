import * as React from 'react';
import { render, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import { configureStore } from '../../state/configureStore';
import Game from './Game';
import { Provider } from 'react-redux';

function renderGame() {
  const store = configureStore();
  return render(
    <Provider store={store}>
      <Game />
    </Provider>,
  );
}

test('allows playing according to rules', () => {
  renderGame();

  const buttons = screen.getAllByRole('button', { name: /^$/ });
  userEvent.click(buttons[0]);
  expect(screen.getByRole('button', { name: /x/i })).toBeInTheDocument();

  const buttonNotClickable = buttons[Math.floor(buttons.length / 2)];
  userEvent.click(buttonNotClickable);
  expect(screen.queryByRole('button', { name: /o/i })).not.toBeInTheDocument();

  userEvent.click(buttons[1]);
  expect(screen.getByRole('button', { name: /o/i })).toBeInTheDocument();
});
