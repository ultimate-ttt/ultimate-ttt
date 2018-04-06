import * as React from 'react';
import BigBoard from './board/BigBoard/BigBoard';
import GameFinishedText from './GameFinishedText/GameFinishedText';

interface AppProps {
}

interface AppRootState {
}

export class App extends React.Component<AppProps, AppRootState> {

    constructor( props: any ) {
        super( props );
    }

    render() {
        return (
            <div className="center">
                <GameFinishedText/>
                <BigBoard/>
            </div>
        );
    }
}