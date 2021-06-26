import * as React from 'react';
import { render, screen } from '../../test-utils';
import userEvent, { specialChars } from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './ArrowButtons.story';
const { Standard, Maximum, Minimum, WithKeyboard } = composeStories(stories);

test('renders next & previous buttons & allows clicking', () => {
  const onInteraction = jest.fn();

  render(<Standard onInteraction={onInteraction} />);
  const next = screen.getByRole('button', { name: /next/i });
  const previous = screen.getByRole('button', { name: /previous/i });
  expect(next).toBeInTheDocument();
  expect(next).not.toBeDisabled();
  expect(previous).toBeInTheDocument();
  expect(previous).not.toBeDisabled();

  userEvent.click(next);
  expect(onInteraction).toHaveBeenCalledWith(true);
  userEvent.click(previous);
  expect(onInteraction).toHaveBeenCalledWith(false);
});

test('disables next button when Maximum', () => {
  const onInteraction = jest.fn();
  render(<Maximum />);

  const next = screen.getByRole('button', { name: /next/i });
  userEvent.click(next);
  expect(next).toBeDisabled();
  expect(onInteraction).not.toHaveBeenCalled();
});

test('disables previous button when Minimum', () => {
  const onInteraction = jest.fn();
  render(<Minimum />);

  const previous = screen.getByRole('button', { name: /previous/i });
  userEvent.click(previous);
  expect(previous).toBeDisabled();
  expect(onInteraction).not.toHaveBeenCalled();
});

describe('handleKeyboard', () => {
  test('allows using arrow keys', () => {
    const onInteraction = jest.fn();
    render(<WithKeyboard onInteraction={onInteraction} />);

    userEvent.keyboard(specialChars.arrowLeft);
    userEvent.keyboard(specialChars.arrowRight);
    expect(onInteraction).toHaveBeenCalledWith(false);
    expect(onInteraction).toHaveBeenCalledWith(true);
  });

  test('doesnt allow keyboard when handleKeyboard is false', () => {
    const onInteraction = jest.fn();
    render(<Standard onInteraction={onInteraction} />);

    userEvent.keyboard(specialChars.arrowLeft);
    userEvent.keyboard(specialChars.arrowRight);
    expect(onInteraction).not.toHaveBeenCalled();
  });

  test('doesnt allow using arrow key when value is minValue', () => {
    const onInteraction = jest.fn();
    render(<WithKeyboard onInteraction={onInteraction} value={1} />);

    userEvent.keyboard(specialChars.arrowLeft);
    expect(onInteraction).not.toHaveBeenCalled();
  });

  test('doesnt allow using arrow key when value is maxValue', () => {
    const onInteraction = jest.fn();
    render(<WithKeyboard onInteraction={onInteraction} value={5} />);

    userEvent.keyboard(specialChars.arrowRight);
    expect(onInteraction).not.toHaveBeenCalled();
  });
});
