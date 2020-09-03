import * as React from 'react';
import { shallow } from 'enzyme';
import { HistoryButtons } from './HistoryButtons';
import { Button } from '@rmwc/button';

describe('HistoryButtons', function () {
  it('should match snapshot', () => {
    const moveForwardInHistory = jest.fn((numberOfMoves) => {});
    const moveBackwardInHistory = jest.fn((numberOfMoves) => {});
    const onInteraction = jest.fn((newMoveNumber) => {});

    const historyButtons = shallow(
      <HistoryButtons
        currentMove={1}
        lastMove={15}
        moveForwardInHistory={moveForwardInHistory}
        moveBackwardInHistory={moveBackwardInHistory}
        onInteraction={onInteraction}
      />,
    );

    expect(historyButtons).toMatchSnapshot();
  });

  describe('disabled behaviour', () => {
    it('has a disabled move backward button when current move is 1', () => {
      const moveForwardInHistory = jest.fn((numberOfMoves) => {});
      const moveBackwardInHistory = jest.fn((numberOfMoves) => {});
      const onInteraction = jest.fn((newMoveNumber) => {});

      const historyButtons = shallow(
        <HistoryButtons
          currentMove={1}
          lastMove={15}
          moveForwardInHistory={moveForwardInHistory}
          moveBackwardInHistory={moveBackwardInHistory}
          onInteraction={onInteraction}
        />,
      );

      const backwardButton = historyButtons.find(Button).get(0);
      const forwardButton = historyButtons.find(Button).get(1);

      expect(backwardButton.props.disabled).toBe(true);
      expect(forwardButton.props.disabled).toBe(false);
    });

    it('has a disabled move forward button when current move is the last move', () => {
      const moveForwardInHistory = jest.fn((numberOfMoves) => {});
      const moveBackwardInHistory = jest.fn((numberOfMoves) => {});
      const onInteraction = jest.fn((newMoveNumber) => {});

      const historyButtons = shallow(
        <HistoryButtons
          currentMove={15}
          lastMove={15}
          moveForwardInHistory={moveForwardInHistory}
          moveBackwardInHistory={moveBackwardInHistory}
          onInteraction={onInteraction}
        />,
      );

      const backwardButton = historyButtons.find(Button).get(0);
      const forwardButton = historyButtons.find(Button).get(1);

      expect(backwardButton.props.disabled).toBe(false);
      expect(forwardButton.props.disabled).toBe(true);
    });
  });

  describe('click behaviour', () => {
    it('calls forward when move forward button is clicked', () => {
      const moveForwardInHistory = jest.fn((numberOfMoves) => {});
      const moveBackwardInHistory = jest.fn((numberOfMoves) => {});
      const onInteraction = jest.fn((newMoveNumber) => {});

      const historyButtons = shallow(
        <HistoryButtons
          currentMove={1}
          lastMove={15}
          moveForwardInHistory={moveForwardInHistory}
          moveBackwardInHistory={moveBackwardInHistory}
          onInteraction={onInteraction}
        />,
      );

      const forwardButton = historyButtons.find(Button).at(1);
      forwardButton.simulate('click');

      expect(moveForwardInHistory).toHaveBeenCalledWith(1);
    });

    it('calls backward when move backward button is clicked', () => {
      const moveForwardInHistory = jest.fn((numberOfMoves) => {});
      const moveBackwardInHistory = jest.fn((numberOfMoves) => {});
      const onInteraction = jest.fn((newMoveNumber) => {});

      const historyButtons = shallow(
        <HistoryButtons
          currentMove={1}
          lastMove={15}
          moveForwardInHistory={moveForwardInHistory}
          moveBackwardInHistory={moveBackwardInHistory}
          onInteraction={onInteraction}
        />,
      );

      const backwardButton = historyButtons.find(Button).first();
      backwardButton.simulate('click');

      expect(moveBackwardInHistory).toHaveBeenCalledWith(1);
    });
  });

  describe('keyboard event behaviour', () => {
    it('calls backward when left arrow is pressed', () => {
      const moveForwardInHistory = jest.fn((numberOfMoves) => {});
      const moveBackwardInHistory = jest.fn((numberOfMoves) => {});
      const onInteraction = jest.fn((newMoveNumber) => {});

      shallow(
        <HistoryButtons
          currentMove={5}
          lastMove={15}
          moveForwardInHistory={moveForwardInHistory}
          moveBackwardInHistory={moveBackwardInHistory}
          onInteraction={onInteraction}
        />,
      );

      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      window.dispatchEvent(event);

      expect(moveBackwardInHistory).toHaveBeenCalledWith(1);
      expect(moveForwardInHistory).toHaveBeenCalledTimes(0);
    });

    it('calls forward when right arrow is pressed', () => {
      const moveForwardInHistory = jest.fn((numberOfMoves) => {});
      const moveBackwardInHistory = jest.fn((numberOfMoves) => {});
      const onInteraction = jest.fn((newMoveNumber) => {});

      shallow(
        <HistoryButtons
          currentMove={5}
          lastMove={15}
          moveForwardInHistory={moveForwardInHistory}
          moveBackwardInHistory={moveBackwardInHistory}
          onInteraction={onInteraction}
        />,
      );

      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      window.dispatchEvent(event);

      expect(moveForwardInHistory).toHaveBeenCalledWith(1);
      expect(moveBackwardInHistory).toHaveBeenCalledTimes(0);
    });

    it('doesnt call backward when left arrow is pressed and moveNumber is 1', () => {
      const moveForwardInHistory = jest.fn((numberOfMoves) => {});
      const moveBackwardInHistory = jest.fn((numberOfMoves) => {});
      const onInteraction = jest.fn((newMoveNumber) => {});

      shallow(
        <HistoryButtons
          currentMove={1}
          lastMove={15}
          moveForwardInHistory={moveForwardInHistory}
          moveBackwardInHistory={moveBackwardInHistory}
          onInteraction={onInteraction}
        />,
      );

      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      window.dispatchEvent(event);

      expect(moveBackwardInHistory).toHaveBeenCalledTimes(0);
      expect(moveForwardInHistory).toHaveBeenCalledTimes(0);
    });

    it('doesnt call forward when right arrow is pressed and moveNumber is the last one', () => {
      const moveForwardInHistory = jest.fn((numberOfMoves) => {});
      const moveBackwardInHistory = jest.fn((numberOfMoves) => {});
      const onInteraction = jest.fn((newMoveNumber) => {});

      shallow(
        <HistoryButtons
          currentMove={15}
          lastMove={15}
          moveForwardInHistory={moveForwardInHistory}
          moveBackwardInHistory={moveBackwardInHistory}
          onInteraction={onInteraction}
        />,
      );

      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      window.dispatchEvent(event);

      expect(moveBackwardInHistory).toHaveBeenCalledTimes(0);
      expect(moveForwardInHistory).toHaveBeenCalledTimes(0);
    });
  });
});
