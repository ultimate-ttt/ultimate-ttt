import * as React from 'react';
import { AppState, Player } from '../../state/AppState';
import { connect } from 'react-redux';
import { XSymbol } from '../Symbols/XSymbol';
import { OSymbol } from '../Symbols/OSymbol';
import { restartGame } from '../../state/commonAction';
import { Button } from '@rmwc/button';
import './gameFinished.css';

interface GameFinishedDisplayProps {
  isGameFinished: boolean;
  winner: Player;
  onRestartGame: () => void;
}

interface GameFinishedDisplayState {
  winnerClassAttribute: string;
  winnerText: string | JSX.Element;
}

export class GameFinishedDisplay extends React.Component<
  GameFinishedDisplayProps,
  GameFinishedDisplayState
> {
  static getWinnerText(player: Player, isGameFinished: boolean) {
    if (isGameFinished) {
      if (player === Player.Circle) {
        return (
          <>
            <OSymbol className="winner-symbol" shouldAnimate={false} /> wins!
          </>
        );
      } else if (player === Player.Cross) {
        return (
          <>
            <XSymbol className="winner-symbol" shouldAnimate={false} /> wins!
          </>
        );
      } else {
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

  static getDerivedStateFromProps(nextProps: GameFinishedDisplayProps) {
    if (nextProps.isGameFinished) {
      return {
        winnerClassAttribute: 'visible',
        winnerText: GameFinishedDisplay.getWinnerText(
          nextProps.winner,
          nextProps.isGameFinished,
        ),
      };
    }

    return null;
  }

  constructor(props: GameFinishedDisplayProps) {
    super(props);

    this.state = {
      winnerClassAttribute: 'hidden',
      winnerText: GameFinishedDisplay.getWinnerText(Player.Circle, false),
    };
  }

  tryRestart = () => {
    if (this.props.isGameFinished) {
      // for the ease out to work.
      // otherwise the "reservation" text gets rendered before it's eased out
      this.setState((prevState) => {
        return {
          ...prevState,
          winnerClassAttribute: 'hidden',
        };
      });

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
