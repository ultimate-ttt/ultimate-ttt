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

  describe('custom config', () => {
    it('applies custom props to buttons', () => {
      const onInteraction = jest.fn((forward) => {});

      const arrowButtons = mount(
        <ArrowButtons
          value={1}
          minValue={1}
          maxValue={15}
          onInteraction={onInteraction}
          leftButtonConfig={{
            buttonProps: {
              danger: true,
            },
          }}
          rightButtonConfig={{
            buttonProps: {
              danger: true,
            },
          }}
        />,
      );

      const backwardButton = arrowButtons.find(Button).get(0);
      const forwardButton = arrowButtons.find(Button).get(1);

      expect(backwardButton.props.danger).toBe(true);
      expect(forwardButton.props.danger).toBe(true);
    });

    it('hides left button', () => {
      const onInteraction = jest.fn((forward) => {});

      const arrowButtons = mount(
        <ArrowButtons
          value={1}
          minValue={1}
          maxValue={15}
          onInteraction={onInteraction}
          leftButtonConfig={{
            hide: true,
          }}
        />,
      );

      const backwardButton = arrowButtons.find(Button);
      expect(backwardButton).toHaveLength(1);
    });

    it('hides right button', () => {
      const onInteraction = jest.fn((forward) => {});

      const arrowButtons = mount(
        <ArrowButtons
          value={1}
          minValue={1}
          maxValue={15}
          onInteraction={onInteraction}
          rightButtonConfig={{
            hide: true,
          }}
        />,
      );

      const buttons = arrowButtons.find(Button);
      expect(buttons).toHaveLength(1);
    });
  });
});
