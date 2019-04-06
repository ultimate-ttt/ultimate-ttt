import * as React from 'react';
import { Button } from '@rmwc/button';
import { scroller } from 'react-scroll/modules';
import { moveScrollElementBaseName } from './ScrollElementConstants';

interface HistoryButtonsProps {
  currentMove: number;
  lastMove: number;
  moveForwardInHistory: (numberOfMoves: number) => void;
  moveBackwardInHistory: (numberOfMoves: number) => void;
}

export class HistoryButtons extends React.Component<HistoryButtonsProps> {
  handleEvent = (event: KeyboardEvent) => {
    const {
      currentMove,
      lastMove,
      moveBackwardInHistory,
      moveForwardInHistory,
    } = this.props;

    if (
      (event.key === 'ArrowLeft' || event.key === 'Left') &&
      this.props.currentMove !== 1
    ) {
      moveBackwardInHistory(1);
      this.scrollToElement(currentMove - 1);
    }

    if (
      (event.key === 'ArrowRight' || event.key === 'Right') &&
      currentMove !== lastMove
    ) {
      moveForwardInHistory(1);
      this.scrollToElement(currentMove + 1);
    }
  };

  scrollToElement = (moveNumberToScrollTo: number) => {
    scroller.scrollTo(moveScrollElementBaseName + moveNumberToScrollTo, {
      duration: 300,
      smooth: true,
      containerId: 'moveList',
      offset: -108,
    });
  };

  componentDidMount(): void {
    window.addEventListener('keydown', this.handleEvent);
  }

  componentWillUnmount(): void {
    window.removeEventListener('keydown', this.handleEvent);
  }

  render() {
    const {
      currentMove,
      lastMove,
      moveForwardInHistory,
      moveBackwardInHistory,
    } = this.props;

    return (
      <div>
        <Button
          disabled={currentMove === 1}
          dense={true}
          raised={true}
          icon="arrow-left"
          onClick={() => {
            moveBackwardInHistory(1);
            this.scrollToElement(currentMove - 1);
          }}
        >
          Previous
        </Button>
        <Button
          disabled={currentMove === lastMove}
          dense={true}
          raised={true}
          trailingIcon="arrow-right"
          onClick={() => {
            moveForwardInHistory(1);
            this.scrollToElement(currentMove + 1);
          }}
        >
          Next
        </Button>
      </div>
    );
  }
}
