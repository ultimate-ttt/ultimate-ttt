import * as React from 'react';
import { AppState, Player } from '../../state/AppState';
import { connect } from 'react-redux';
import { XSymbol } from '../symbols/XSymbol';
import { OSymbol } from '../symbols/OSymbol';
import Confetti from 'react-dom-confetti';

interface GameFinishedDisplayProps {
    isGameFinished: boolean;
    winner: Player;
}

interface GameFinishedDisplayState {
}

export class GameFinishedDisplay extends React.Component<GameFinishedDisplayProps, GameFinishedDisplayState> {

    constructor( props: GameFinishedDisplayProps ) {
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

    render() {
        const {isGameFinished, winner} = this.props;

        const winnerText = this.getWinnerText( winner, isGameFinished );
        // so that the board doesn't go down when I show the winner text
        const hiddenStyle = this.getHiddenStyle( isGameFinished );
        // otherwise the text sticks all the way to the top in safari.
        const marginTop = {
            marginTop: '1em'
        };

        const confettiConfig = {
            elementCount: 250,
            spread: 360,
            startVelocity: 35,
            decay: 0.97
        };

        return (
            <div className="flex-middle" style={Object.assign(hiddenStyle, marginTop)}>
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
