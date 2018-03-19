import * as React from 'react';
import { AppState, Player } from '../state/AppState';
import { connect } from 'react-redux';

interface GameFinishedTextProps {
    isGameFinished: boolean;
    winner: Player;
}

interface GameFinishedTextState {
}

class GameFinishedText extends React.Component<GameFinishedTextProps, GameFinishedTextState> {

    constructor( props: GameFinishedTextProps ) {
        super( props );
    }

    getPlayerText( player: Player, isGameFinished: boolean ) {
        if (isGameFinished) {
            if (player === Player.Circle) {
                return 'Circle wins';
            } else if (player === Player.Cross) {
                return 'Cross wins';
            } else {
                return `It's a draw.`;
            }
        }
        return '';
    }

    render() {
        const {isGameFinished, winner} = this.props;

        const text = isGameFinished ? 'Game Ends.' : '';
        const winnerText = this.getPlayerText( winner!, isGameFinished! );

        return (
            <p className="text-center">
                {text} {winnerText}
            </p>
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
