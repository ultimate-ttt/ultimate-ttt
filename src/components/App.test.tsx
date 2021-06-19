import * as React from 'react';
import { App } from './App';
import { renderWithStore, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  it('should render game', () => {
    renderWithStore(<App />);

    const buttons = screen.getAllByRole('button', { name: /^$/ });
    userEvent.click(buttons[0]);
    expect(screen.getByRole('button', { name: /x/i })).toBeInTheDocument();
  });
});
