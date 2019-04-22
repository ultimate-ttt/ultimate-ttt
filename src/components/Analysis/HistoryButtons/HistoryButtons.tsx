import * as React from 'react';
import { Button } from '@rmwc/button';
import styles from './HistoryButtons.module.css';

interface HistoryButtonsProps {
  currentMove: number;
  lastMove: number;
  moveForwardInHistory: (numberOfMoves: number) => void;
  moveBackwardInHistory: (numberOfMoves: number) => void;
  onInteraction: (newMoveNumber: number) => void;
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
      this.props.onInteraction(currentMove - 1);
    }

    if (
      (event.key === 'ArrowRight' || event.key === 'Right') &&
      currentMove !== lastMove
    ) {
      moveForwardInHistory(1);
      this.props.onInteraction(currentMove + 1);
    }
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
      onInteraction,
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
            onInteraction(currentMove - 1);
          }}
          className={styles.buttonMargin}
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
            onInteraction(currentMove + 1);
          }}
          className={styles.buttonMargin}
        >
          Next
        </Button>
      </div>
    );
  }
}
