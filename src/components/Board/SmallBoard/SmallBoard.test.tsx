import * as React from 'react';
import { render, screen } from '../../../test-utils';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './SmallBoard.story';
const { WithValues, WinnerCross, NoWinner } = composeStories(stories);

test('renders buttons with content', () => {
  render(<WithValues />);

  const buttons = screen.getAllByRole('button');
  const removeExtensions = (str: string) => str.replace(/\..*/, '');
  const buttonContent = buttons.map((b: HTMLElement) =>
    b.textContent !== null ? removeExtensions(b.textContent) : '',
  );
  expect(buttonContent).toMatchInlineSnapshot(`
    Array [
      "",
      "x",
      "",
      "",
      "o",
      "",
      "x",
      "",
      "o",
    ]
  `);
  expect(buttons).toHaveLength(9);
});

test('checks value for allowing clicking', () => {
  const onClick = jest.fn();
  render(<WithValues onTileClicked={onClick} />);

  const buttonsWithValue = screen.getAllByRole('button', { name: /./ });
  buttonsWithValue.forEach((button) => userEvent.click(button));
  expect(onClick).not.toHaveBeenCalled();

  const buttonsEmpty = screen.getAllByRole('button', { name: /^$/ });
  buttonsEmpty.forEach((button) => userEvent.click(button));

  expect(onClick).toHaveBeenCalledTimes(5);
});

test('doesnt allow clicking when move is not allowed', () => {
  const onClick = jest.fn();
  render(<NoWinner />);

  const buttons = screen.getAllByRole('button');
  buttons.forEach((button) => userEvent.click(button));
  expect(onClick).not.toHaveBeenCalled();
});

test('only adds one button when board is finished', () => {
  const onClick = jest.fn();
  render(<WinnerCross onTileClicked={onClick} />);

  const buttons = screen.getAllByRole('button');
  expect(buttons).toHaveLength(1);
  userEvent.click(buttons[0]);
  expect(onClick).not.toHaveBeenCalled();
});
