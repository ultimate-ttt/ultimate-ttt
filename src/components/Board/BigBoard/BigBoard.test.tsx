import * as React from 'react';
import { render, screen } from '../../../test-utils';
import userEvent from '@testing-library/user-event';
import { unfinishedBoardMock } from '../../../mocks/board';
import { composeStories } from '@storybook/testing-react';
import * as stories from './BigBoard.story';
const { Empty } = composeStories(stories);

test('should render buttons for board', () => {
  render(<Empty />);

  const buttons = screen.getAllByRole('button');
  const removeExtensions = (str: string) => str.replace(/\..*/, '');
  const buttonContent = buttons.map((b: HTMLElement) =>
    b.textContent !== null ? removeExtensions(b.textContent) : '',
  );
  expect(buttonContent).toHaveLength(9 * 9);
  const expectedContent = Array.from({ length: 9 * 9 }).map((_) => '');
  expect(buttonContent).toEqual(expectedContent);
});

test('allows clicking on buttons without content', () => {
  const playerMoved = jest.fn(() => {});

  render(<Empty board={unfinishedBoardMock} onPlayerMoved={playerMoved} />);

  const buttonsWithContent = screen.getAllByRole('button', { name: /./ });
  buttonsWithContent.forEach((button) => userEvent.click(button));
  expect(playerMoved).not.toHaveBeenCalled();

  const emptyButtons = screen.getAllByRole('button', { name: /^$/ });
  emptyButtons.forEach((button) => userEvent.click(button));
  expect(playerMoved).toHaveBeenCalledTimes(emptyButtons.length);
});
