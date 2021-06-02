import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { ArrowButtons } from './ArrowButtons';
import { Button } from '@rmwc/button';

describe('ArrowButtons', function () {
  it('should match snapshot', () => {
    const onInteraction = jest.fn((forward) => {});

    const arrowButons = shallow(
      <ArrowButtons
        value={1}
        minValue={1}
        maxValue={15}
        onInteraction={onInteraction}
      />,
    );

    expect(arrowButons).toMatchSnapshot();
  });

  describe('disabled behaviour', () => {
    it('has a disabled backward button when current value is 1', () => {
      const onInteraction = jest.fn((forward) => {});

      const arrowButtons = mount(
        <ArrowButtons
          value={1}
          minValue={1}
          maxValue={15}
          onInteraction={onInteraction}
        />,
      );

      const backwardButton = arrowButtons.find(Button).get(0);
      const forwardButton = arrowButtons.find(Button).get(1);

      expect(backwardButton.props.disabled).toBe(true);
      expect(forwardButton.props.disabled).toBe(false);
    });

    it('has a disabled next button when current value is maxValue', () => {
      const onInteraction = jest.fn((forward) => {});

      const arrowButtons = shallow(
        <ArrowButtons
          value={15}
          minValue={1}
          maxValue={15}
          onInteraction={onInteraction}
        />,
      );

      const backwardButton = arrowButtons.find(Button).get(0);
      const forwardButton = arrowButtons.find(Button).get(1);

      expect(backwardButton.props.disabled).toBe(false);
      expect(forwardButton.props.disabled).toBe(true);
    });
  });

  describe('click behaviour', () => {
    it('calls onInteraction with true when next button is clicked', () => {
      const onInteraction = jest.fn((forward) => {});

      const arrowButtons = shallow(
        <ArrowButtons
          value={1}
          minValue={1}
          maxValue={15}
          onInteraction={onInteraction}
        />,
      );

      const forwardButton = arrowButtons.find(Button).at(1);
      forwardButton.simulate('click');

      expect(onInteraction).toHaveBeenCalledWith(true);
    });

    it('calls onInteraction with false when previous button is clicked', () => {
      const onInteraction = jest.fn((forward) => {});

      const arrowButtons = shallow(
        <ArrowButtons
          value={5}
          minValue={1}
          maxValue={15}
          onInteraction={onInteraction}
        />,
      );

      const backwardButton = arrowButtons.find(Button).first();
      backwardButton.simulate('click');

      expect(onInteraction).toHaveBeenCalledWith(false);
    });
  });

  describe('keyboard event behaviour', () => {
    it('doesnt handle keyboard when prop is not set', () => {
      const onInteraction = jest.fn((forward) => {});

      mount(
        <ArrowButtons
          value={5}
          minValue={1}
          maxValue={15}
          onInteraction={onInteraction}
        />,
      );

      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      window.dispatchEvent(event);

      expect(onInteraction).toHaveBeenCalledTimes(0);
    });

    it('calls onInteraction with false when left arrow is pressed', () => {
      const onInteraction = jest.fn((forward) => {});

      mount(
        <ArrowButtons
          handleKeyboard={true}
          value={5}
          minValue={1}
          maxValue={15}
          onInteraction={onInteraction}
        />,
      );

      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      window.dispatchEvent(event);

      expect(onInteraction).toHaveBeenCalledWith(false);
    });

    it('calls onInteraction with true when right arrow is pressed', () => {
      const onInteraction = jest.fn((forward) => {});

      mount(
        <ArrowButtons
          handleKeyboard={true}
          value={5}
          minValue={1}
          maxValue={15}
          onInteraction={onInteraction}
        />,
      );

      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      window.dispatchEvent(event);

      expect(onInteraction).toHaveBeenCalledWith(true);
    });

    it('doesnt call onInteraction when left arrow is pressed and value is minValue', () => {
      const onInteraction = jest.fn((forward) => {});

      mount(
        <ArrowButtons
          handleKeyboard={true}
          value={1}
          minValue={1}
          maxValue={15}
          onInteraction={onInteraction}
        />,
      );

      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      window.dispatchEvent(event);

      expect(onInteraction).toHaveBeenCalledTimes(0);
    });

    it('doesnt call onInteraction when right arrow is pressed and value is maxValue', () => {
      const onInteraction = jest.fn((forward) => {});

      mount(
        <ArrowButtons
          handleKeyboard={true}
          value={15}
          minValue={1}
          maxValue={15}
          onInteraction={onInteraction}
        />,
      );

      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      window.dispatchEvent(event);

      expect(onInteraction).toHaveBeenCalledTimes(0);
    });
  });
});
