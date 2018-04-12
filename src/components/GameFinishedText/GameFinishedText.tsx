import * as React from 'react';
import { AppState, Player } from '../../state/AppState';
import { connect } from 'react-redux';
import { XSymbol } from '../symbols/XSymbol';
import { OSymbol } from '../symbols/OSymbol';
import Confetti from 'react-dom-confetti';

interface GameFinishedTextProps {
    isGameFinished: boolean;
    winner: Player;
}

interface GameFinishedTextState {
}

export class GameFinishedText extends React.Component<GameFinishedTextProps, GameFinishedTextState> {

    constructor( props: GameFinishedTextProps ) {
        super( props );
    }

    getPlayerText( player: Player, isGameFinished: boolean ) {
        if (isGameFinished) {
            if (player === Player.Circle) {
                return (<><OSymbol shouldAnimate={false}/> wins!</>);
            } else if (player === Player.Cross) {
                return (<><XSymbol shouldAnimate={false}/> wins!</>);
            } else {
                return `It's a draw!`;
            }
        }

        return '';
    }

    render() {
        const {isGameFinished, winner} = this.props;

        let winnerText = this.getPlayerText( winner, isGameFinished );

        const confettiConfig = {
            elementCount: 180,
            spread: 360,
            startVelocity: 25,
            decay: 0.95
        };

        return (
            <div className="flex-middle">
                <p style={{fontSize: '3.5vmin'}}>
                    {winnerText}
                </p>
                <div className="center">
                    <Confetti config={confettiConfig} active={isGameFinished}/>
                </div>
            </div>
        );

    }
}

const mapStateToProps = ( state: AppState ) => ({
    isGameFinished: state.game.isFinished,
    winner: state.game.winningPlayer,
});

export default connect( mapStateToProps )( GameFinishedText );
