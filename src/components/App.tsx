import * as React from 'react';
import BigBoard from './Board/BigBoard/BigBoard';
import GithubCorner from 'react-github-corner';
import GameFinishedDisplay from './GameFinishedDisplay/GameFinishedDisplay';
// import individual material component styles here.
import '@material/button/dist/mdc.button.min.css';

interface AppProps {
}

interface AppRootState {
}

export class App extends React.Component<AppProps, AppRootState> {

    lightBlue = window.getComputedStyle(document.body).getPropertyValue('--tropical-teal').trim();

    constructor( props: any ) {
        super( props );
    }

    render() {
        return (
            <>
                <GithubCorner
                    href="https://github.com/maracuja-juice/ultimate-tic-tac-react"
                    bannerColor={this.lightBlue}
                    octoColor="#fff"
                    size={80}
                    direction="right"
                />
                <div className="center">
                    <GameFinishedDisplay />
                    <BigBoard/>
                </div>
            </>
        );
    }
}