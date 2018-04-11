import * as React from 'react';
import { AppState, Player } from '../../state/AppState';
import { connect } from 'react-redux';
import { XSymbol } from '../symbols/XSymbol';
import { OSymbol } from '../symbols/OSymbol';
import { Confetti } from 'react-dom-confetti';

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

        const winnerText = this.getPlayerText( winner, isGameFinished );

        return (
            <>
                <p className="text-center text-game-ends">
                    {winnerText}
                </p>
                <Confetti active={isGameFinished} />
            </>
        );

    }
}

const mapStateToProps = ( state: AppState ) => ({
    isGameFinished: state.game.isFinished,
    winner: state.game.winningPlayer
});

// tslint:disable-next-line: no-any
const mapDispatchToProps = ( dispatch: any ) => ({});

export default connect( mapStateToProps, mapDispatchToProps )( GameFinishedText );
