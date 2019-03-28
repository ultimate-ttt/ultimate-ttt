import * as React from 'react';
import BigBoard from './Board/BigBoard/BigBoard';
import GithubCorner from 'react-github-corner';
import GameFinishedDisplay from './GameFinishedDisplay/GameFinishedDisplay';
// import individual material component styles here.
import '@material/button/dist/mdc.button.min.css';

export class App extends React.Component {

    lightBlue = window.getComputedStyle(document.body).getPropertyValue('--tropical-teal').trim();

    render() {
        return (
            <>
                <GithubCorner
                    href="https://github.com/ultimate-ttt/ultimate-ttt"
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