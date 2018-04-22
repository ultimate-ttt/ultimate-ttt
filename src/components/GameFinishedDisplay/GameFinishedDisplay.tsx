import * as React from 'react';
import { AppState, Player } from '../../state/AppState';
import { connect } from 'react-redux';
import { XSymbol } from '../symbols/XSymbol';
import { OSymbol } from '../symbols/OSymbol';
import Confetti from 'react-dom-confetti';
import { restartGame as restartAction } from '../../state/commonAction';
import { Button } from 'rmwc/Button';

interface GameFinishedDisplayProps {
    isGameFinished: boolean;
    winner: Player;
    restartGame: () => void;
}

interface GameFinishedDisplayState {
}

export class GameFinishedDisplay extends React.Component<GameFinishedDisplayProps, GameFinishedDisplayState> {

    constructor( props: GameFinishedDisplayProps ) {
        super( props );

        this.tryRestart = this.tryRestart.bind( this );
    }

    getWinnerText( player: Player, isGameFinished: boolean ) {

        if (isGameFinished) {
            const fontSize = {
                fontSize: '4.5vmin'
            };
            if (player === Player.Circle) {
                return (<><OSymbol style={fontSize} shouldAnimate={false}/> wins!</>);
            } else if (player === Player.Cross) {
                return (<><XSymbol style={fontSize} shouldAnimate={false}/> wins!</>);
            } else {
                return `It's a draw!`;
            }
        }

        // this will be hidden
        // it's there so that the board doesn't shift down when it's displayed
        return <><XSymbol shouldAnimate={false}/>some text</>;
    }

    getHiddenStyle( isGameFinished: boolean ) {
        if (!isGameFinished) {
            return {
                visibility: 'hidden'
            };
        }
        return {};
    }

    tryRestart() {
        if (this.props.isGameFinished) {
            this.props.restartGame();
        }
    }

    render() {
        const {isGameFinished, winner} = this.props;

        const winnerText = this.getWinnerText( winner, isGameFinished );
        // so that the board doesn't go down when I show the winner text
        // TODO: make some kind of transition from hidden to visible
        const hiddenStyle = this.getHiddenStyle( isGameFinished );

        const confettiConfig = {
            elementCount: 250,
            spread: 360,
            startVelocity: 35,
            decay: 0.97
        };

        // TODO improve styling of button on smaller screens!!
        const combinedStyle = Object.assign( hiddenStyle, {fontSize: '3.5vmin'} );
        return (
            <>
                <p style={combinedStyle} className="flex-middle">
                    <span style={{paddingRight: '0.5em'}}>{winnerText}</span>
                    <Button raised={true} onClick={this.tryRestart}>
                        Restart
                    </Button>
                </p>
                <div className="center">
                    <Confetti config={confettiConfig} active={isGameFinished}/>
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
