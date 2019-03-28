import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GithubCorner from 'react-github-corner';
import { Game } from '../views/Game';
import { Analytics } from '../views/Analytics';
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
                <Router>
                    <div>
                        <Route exact={true} path="/" component={Game}/>
                        /* TODO Maybe two different components? */
                        <Route exact={true} path="/analytics" component={Analytics}/>
                        <Route exact={true} path="/analytics/:gameId" component={Analytics} />
                    </div>
                </Router>
            </>

        );
    }
}