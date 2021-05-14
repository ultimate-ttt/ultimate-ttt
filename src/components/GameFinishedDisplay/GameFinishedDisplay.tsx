import * as React from 'react';
import { AppState, Winner } from '../../state/AppState';
import { connect } from 'react-redux';
import { restartGame } from '../../state/commonAction';
import { Button } from '@rmwc/button';
import styles from './GameFinished.module.css';
import classNames from 'classnames';
import { Icon } from '@rmwc/icon';
import { Typography } from '@rmwc/typography';
import { OIcon, XIcon } from '../Icons';

interface GameFinishedDisplayProps {
  isGameFinished: boolean;
  winner: Winner;
  onRestartGame: () => void;
}

interface GameFinishedDisplayState {
  visible: boolean;
  winnerText: string | JSX.Element;
}

export class GameFinishedDisplay extends React.Component<
  GameFinishedDisplayProps,
  GameFinishedDisplayState
> {
  constructor(props: GameFinishedDisplayProps) {
    super(props);

    this.state = {
      visible: this.props.isGameFinished,
      winnerText: this.getWinnerText(this.props.winner),
    };
  }

  componentDidUpdate(prevProps: GameFinishedDisplayProps) {
    const { isGameFinished, winner } = this.props;

    if (isGameFinished !== prevProps.isGameFinished) {
      this.setState((prevState) => {
        const nextWinnerText = this.getWinnerText(winner);

        return {
          visible: isGameFinished,
          winnerText: isGameFinished ? nextWinnerText : prevState.winnerText,
        };
      });
    }
  }

  getWinnerText(winner: Winner) {
    switch (winner) {
      case Winner.Circle:
      case Winner.Cross:
        return (
          <>
            <Icon
              icon={{
                icon: winner === Winner.Circle ? <OIcon /> : <XIcon />,
                size: 'large',
              }}
              className={styles.winnerIcon}
            />{' '}
            wins!
          </>
        );
      case Winner.Draw:
        return "It's a draw!";

      // Reservation so that the board doesn't shift down
      default: {
        return (
          <>
            <Icon
              icon={{ icon: <XIcon />, size: 'large' }}
              className={styles.winnerIcon}
            />
            resrv
            {/* This doesn't get shown to anyone, screenreaders included.*/}
          </>
        );
      }
    }
  }

  tryRestart = () => {
    if (this.props.isGameFinished) {
      this.props.onRestartGame();
    }
  };

  render() {
    const { visible, winnerText } = this.state;

    return (
      <div
        className={classNames(styles.restartAlignment, {
          [styles.hidden]: !visible,
          [styles.visible]: visible,
        })}
      >
        <Typography use="headline4" className={styles.winnerText}>
          {winnerText}
        </Typography>
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

const mapDispatchToProps = {
  onRestartGame: () => restartGame(),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameFinishedDisplay);
