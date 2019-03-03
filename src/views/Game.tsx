import * as React from 'react';
import BigBoard from '../components/Board/BigBoard/BigBoard';
import GameFinishedDisplay from '../components/GameFinishedDisplay/GameFinishedDisplay';

interface GameProps {
}

export class Game extends React.Component<GameProps> {

    render() {
        return (
            <div className="center">
                <GameFinishedDisplay />
                <BigBoard/>
            </div>
        );
    }
}