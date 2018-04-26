import * as React from 'react';
import { AppState, Player } from '../../state/AppState';
import { connect } from 'react-redux';
import { XSymbol } from '../symbols/XSymbol';
import { OSymbol } from '../symbols/OSymbol';
import Confetti from 'react-dom-confetti';
import { restartGame as restartAction } from '../../state/commonAction';
import * as classNames from 'classnames';
import { Button } from 'rmwc/Button';
import './gameFinished.css';

interface GameFinishedDisplayProps {
    isGameFinished: boolean;
    winner: Player;
    restartGame: () => void;
}

interface GameFinishedDisplayState {
    lastWinner: Player | null;
    wasGameOnceFinished: boolean;
}

export class GameFinishedDisplay extends React.Component<GameFinishedDisplayProps, GameFinishedDisplayState> {

    constructor( props: GameFinishedDisplayProps ) {
        super( props );

        this.state = {lastWinner: null, wasGameOnceFinished: false};

        this.tryRestart = this.tryRestart.bind( this );
    }

    getWinnerText( player: Player, isGameFinished: boolean ) {

        if (isGameFinished) {
            const fontSize = {
                fontSize: '5vmin'
            }; // TODO: change this to use CSS!!
            if (player === Player.Circle) {
                return (<><OSymbol style={fontSize} shouldAnimate={false}/> wins!</>);
            } else if (player === Player.Cross) {
                return (<><XSymbol style={fontSize} shouldAnimate={false}/> wins!</>);
            } else {
                return `It's a draw!`;
            }
        }

        // this will be hidden
        // it's there so that the board doesn't shift down when the finished text is displayed
        return 'reservation';
    }

    tryRestart() {
        if (this.props.isGameFinished) {
            // for the ease out to work.
            // otherwise the "reservation" text gets rendered before it's eased out
            this.setState( {
                               lastWinner: this.props.winner,
                               wasGameOnceFinished: true
                           } );
            this.props.restartGame();
        }
    }

    render() {
        const {isGameFinished, winner} = this.props;
        const {wasGameOnceFinished, lastWinner} = this.state;

        let winnerText;
        if (!isGameFinished && wasGameOnceFinished) {
            winnerText = this.getWinnerText( lastWinner!, wasGameOnceFinished );
        } else {
            winnerText = this.getWinnerText( winner, isGameFinished );
        }

        const textContainerClass = classNames( {
                                                   'restart-alignment': true,
                                                   'hidden': !isGameFinished,
                                                   'visible': isGameFinished
                                               } );

        return (
            <>
                <div className={textContainerClass}>
                    <p className="winner-text">
                        {winnerText}
                    </p>
                    <Button dense={true} raised={true} onClick={this.tryRestart}>
                        Restart
                    </Button>
                </div>
                <div className="center">
                    <Confetti
                        config={{
                            elementCount: 250,
                            spread: 360,
                            startVelocity: 35,
                            decay: 0.97
                        }}
                        active={isGameFinished}
                    />
                </div>
            </>
        );
    }
}

const mapStateToProps = ( state: AppState ) => ({
    isGameFinished: state.game.isFinished,
    winner: state.game.winningPlayer,
});

// tslint:disable-next-line: no-any
const mapDispatchToProps = ( dispatch: any ) => ({
    restartGame: () =>
        dispatch( restartAction() )
});

export default connect( mapStateToProps, mapDispatchToProps )( GameFinishedDisplay );
