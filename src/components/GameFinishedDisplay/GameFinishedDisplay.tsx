import * as React from 'react';
import { AppState, Player } from '../../state/AppState';
import { connect } from 'react-redux';
import { XSymbol } from '../symbols/XSymbol';
import { OSymbol } from '../symbols/OSymbol';
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

export class GameFinishedDisplay extends React.Component<GameFinishedDisplayProps, GameFinishedDisplayState> {

    constructor( props: GameFinishedDisplayProps ) {
        super( props );

        this.tryRestart = this.tryRestart.bind( this );
        this.getWinnerText = this.getWinnerText.bind( this );

        this.state = {winnerClassAttribute: 'hidden', winnerText: this.getWinnerText( Player.Circle, false )};
    }

    getWinnerText( player: Player, isGameFinished: boolean ) {

        if (isGameFinished) {
            if (player === Player.Circle) {
                return (<><OSymbol className="winner-symbol" shouldAnimate={false}/> wins!</>);
            } else if (player === Player.Cross) {
                return (<><XSymbol className="winner-symbol" shouldAnimate={false}/> wins!</>);
            } else {
                return `It's a draw!`;
            }
        }

        // this will be hidden
        // it's there so that the board doesn't shift down when the finished text is displayed
        return <><XSymbol shouldAnimate={false}/>reservation</>;
    }

    componentWillReceiveProps( nextProps: GameFinishedDisplayProps ) {
        if (nextProps.isGameFinished) {
            this.setState( {
                               winnerClassAttribute: 'visible',
                               winnerText: this.getWinnerText( nextProps.winner, nextProps.isGameFinished )
                           } );
        }
    }

    tryRestart() {
        if (this.props.isGameFinished) {
            // for the ease out to work.
            // otherwise the "reservation" text gets rendered before it's eased out
            this.setState( prevState => {
                return {
                    ...prevState,
                    winnerClassAttribute: 'hidden'
                };
            } );

            this.props.onRestartGame();
        }
    }

    render() {
        const {winnerClassAttribute, winnerText} = this.state;

        const textContainerClass = 'restart-alignment ' + winnerClassAttribute;

        return (
            <div className={textContainerClass}>
                <p className="winner-text">
                    {winnerText}
                </p>
                <Button dense={true} raised={true} onClick={this.tryRestart}>
                    Play Again
                </Button>
            </div>
        );
    }
}

const mapStateToProps = ( state: AppState ) => ({
    isGameFinished: state.game.isFinished,
    winner: state.game.winningPlayer,
});

// tslint:disable-next-line: no-any
const mapDispatchToProps = ( dispatch: any ) => ({
    onRestartGame: () =>
        dispatch( restartGame() )
});

export default connect( mapStateToProps, mapDispatchToProps )( GameFinishedDisplay );
