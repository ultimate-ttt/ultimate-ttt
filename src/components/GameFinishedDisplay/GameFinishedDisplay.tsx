import * as React from 'react';
import { AppState, Winner } from '../../state/AppState';
import { connect } from 'react-redux';
import { XSymbol } from '../Symbols/XSymbol';
import { OSymbol } from '../Symbols/OSymbol';
import { restartGame } from '../../state/commonAction';
import { Button } from '@rmwc/button';
import './gameFinished.css';

interface GameFinishedDisplayProps {
  isGameFinished: boolean;
  winner: Winner;
  onRestartGame: () => void;
}

interface GameFinishedDisplayState {
  winnerClassAttribute: 'hidden' | 'visible';
  winnerText: string | JSX.Element;
}

export class GameFinishedDisplay extends React.Component<
  GameFinishedDisplayProps,
  GameFinishedDisplayState
> {
  constructor(props: GameFinishedDisplayProps) {
    super(props);

    this.state = {
      winnerClassAttribute: this.props.isGameFinished ? 'visible' : 'hidden',
      winnerText: this.getWinnerText(
        this.props.winner,
        this.props.isGameFinished,
      ),
    };
  }

  componentDidUpdate(prevProps: GameFinishedDisplayProps) {
    const { isGameFinished, winner } = this.props;

    if (isGameFinished !== prevProps.isGameFinished) {
      this.setState((prevState) => {
        const nextWinnerText = this.getWinnerText(winner, isGameFinished);

        return {
          winnerText: isGameFinished ? nextWinnerText : prevState.winnerText,
          winnerClassAttribute: isGameFinished ? 'visible' : 'hidden',
        };
      });
    }
  }

  getWinnerText(winner: Winner, isGameFinished: boolean) {
    if (isGameFinished) {
      switch (winner) {
        case Winner.Circle:
          return (
            <>
              <OSymbol className="winner-symbol" shouldAnimate={false} /> wins!
            </>
          );
        case Winner.Cross:
          return (
            <>
              <XSymbol className="winner-symbol" shouldAnimate={false} /> wins!
            </>
          );
        case Winner.Draw:
          return `It's a draw!`;
      }
    }

    // this will be hidden
    // it's there so that the board doesn't shift down when the finished text is displayed
    return (
      <>
        <XSymbol shouldAnimate={false} />
        reservation
      </>
    );
  }

  tryRestart = () => {
    if (this.props.isGameFinished) {
      this.props.onRestartGame();
    }
  };

  render() {
    const { winnerClassAttribute, winnerText } = this.state;

    const textContainerClass = 'restart-alignment ' + winnerClassAttribute;

    return (
      <div className={textContainerClass}>
        <p className="winner-text">{winnerText}</p>
        <Button dense={true} raised={true} onClick={this.tryRestart}>
          Play Again
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isGameFinished: state.currentGame.game.isFinished,
  winner: state.currentGame.game.winningPlayer,
});

// tslint:disable-next-line: no-any
const mapDispatchToProps = (dispatch: any) => ({
  onRestartGame: () => dispatch(restartGame()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameFinishedDisplay);
