import * as React from 'react';
import { render, screen } from '../../test-utils';
import userEvent, { specialChars } from '@testing-library/user-event';
import { ArrowButtons } from './ArrowButtons';

test('renders next & previous buttons', () => {
  render(
    <ArrowButtons
      value={2}
      minValue={1}
      maxValue={5}
      onInteraction={() => {}}
    />,
  );
  const next = screen.getByRole('button', { name: /next/i });
  const previous = screen.getByRole('button', { name: /previous/i });
  expect(next).toBeInTheDocument();
  expect(next).not.toBeDisabled();
  expect(previous).toBeInTheDocument();
  expect(previous).not.toBeDisabled();
});

test('disables next button when value is maxValue', () => {
  const onInteraction = jest.fn();
  render(
    <ArrowButtons
      value={1}
      minValue={0}
      maxValue={1}
      onInteraction={onInteraction}
    />,
  );

  const next = screen.getByRole('button', { name: /next/i });
  userEvent.click(next);
  expect(next).toBeDisabled();
  expect(onInteraction).not.toHaveBeenCalled();
});

test('disables previous button when value is minValue', () => {
  const onInteraction = jest.fn();
  render(
    <ArrowButtons
      value={0}
      minValue={0}
      maxValue={1}
      onInteraction={onInteraction}
    />,
  );

  const previous = screen.getByRole('button', { name: /previous/i });
  userEvent.click(previous);
  expect(previous).toBeDisabled();
  expect(onInteraction).not.toHaveBeenCalled();
});

test('allows clicking next button', () => {
  const onInteraction = jest.fn();
  render(
    <ArrowButtons
      value={2}
      minValue={1}
      maxValue={5}
      onInteraction={onInteraction}
    />,
  );

  const next = screen.getByRole('button', { name: /next/i });
  userEvent.click(next);

  expect(onInteraction).toHaveBeenCalledWith(true);
});

test('allows clicking previous button', () => {
  const onInteraction = jest.fn();
  render(
    <ArrowButtons
      value={2}
      minValue={1}
      maxValue={5}
      onInteraction={onInteraction}
    />,
  );

  const previous = screen.getByRole('button', { name: /previous/i });
  userEvent.click(previous);

  expect(onInteraction).toHaveBeenCalledWith(false);
});

describe('handleKeyboard', () => {
  test('allows using arrow keys', () => {
    const onInteraction = jest.fn();
    render(
      <ArrowButtons
        value={2}
        minValue={1}
        maxValue={5}
        onInteraction={onInteraction}
        handleKeyboard={true}
      />,
    );

    userEvent.keyboard(specialChars.arrowLeft);
    userEvent.keyboard(specialChars.arrowRight);
    expect(onInteraction).toHaveBeenCalledWith(false);
    expect(onInteraction).toHaveBeenCalledWith(true);
  });

  test('doesnt allow keyboard when handleKeyboard is false', () => {
    const onInteraction = jest.fn();
    render(
      <ArrowButtons
        value={2}
        maxValue={5}
        minValue={1}
        onInteraction={onInteraction}
      />,
    );

    userEvent.keyboard(specialChars.arrowLeft);
    userEvent.keyboard(specialChars.arrowRight);
    expect(onInteraction).not.toHaveBeenCalled();
  });

  test('doesnt allow using arrow key when value is minValue', () => {
    const onInteraction = jest.fn();
    render(
      <ArrowButtons
        value={1}
        minValue={1}
        maxValue={5}
        onInteraction={onInteraction}
        handleKeyboard={true}
      />,
    );

    userEvent.keyboard(specialChars.arrowLeft);
    expect(onInteraction).not.toHaveBeenCalled();
  });

  test('doesnt allow using arrow key when value is maxValue', () => {
    const onInteraction = jest.fn();
    render(
      <ArrowButtons
        value={5}
        minValue={1}
        maxValue={5}
        onInteraction={onInteraction}
        handleKeyboard={true}
      />,
    );

    userEvent.keyboard(specialChars.arrowRight);
    expect(onInteraction).not.toHaveBeenCalled();
  });
});
