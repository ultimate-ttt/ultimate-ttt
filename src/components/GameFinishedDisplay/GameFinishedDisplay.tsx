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

export class GameFinishedDisplay extends React.Component<GameFinishedTextProps, GameFinishedTextState> {

    constructor( props: GameFinishedTextProps ) {
        super( props );
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

    render() {
        const {isGameFinished, winner} = this.props;

        const winnerText = this.getWinnerText( winner, isGameFinished );
        // so that the board doesn't go down when I show the winner text
        const hiddenStyle = this.getHiddenStyle( isGameFinished );

        const confettiConfig = {
            elementCount: 180,
            spread: 360,
            startVelocity: 25,
            decay: 0.95
        };

        return (
            <div className="flex-middle" style={hiddenStyle}>
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

export default connect( mapStateToProps )( GameFinishedDisplay );
