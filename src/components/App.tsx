import * as React from 'react';
import { BigBoard } from './board/BigBoard';
import GameFinishedContainer from './GameFinishedContainer';
import CurrentPlayerIndicatorContainer from './CurrentPlayerIndicatorContainer';

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
                <CurrentPlayerIndicatorContainer/>
                <GameFinishedContainer />
                <BigBoard />
            </div>
        );
    }
}