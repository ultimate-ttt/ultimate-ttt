import * as React from 'react';
import { Player } from '../state/AppState';

interface GameFinishedProps {
    isGameFinished?: boolean;
    winner?: Player;
}

interface GameFinishedState {
}

export class GameFinished extends React.Component<GameFinishedProps, GameFinishedState> {

    constructor( props: GameFinishedProps ) {
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