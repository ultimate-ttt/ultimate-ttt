import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GithubCorner from 'react-github-corner';
// import individual material component styles here.
import '@material/button/dist/mdc.button.min.css';
import { Game } from '../views/Game';
import { Analytics } from '../views/Analytics';

export class App extends React.Component {

    constructor( props: any ) {
        super( props );
    }

    render() {
        return (
            <>
                <GithubCorner
                    href="https://github.com/maracuja-juice/ultimate-tic-tac-react"
                    bannerColor="#008891"
                    octoColor="#fff"
                    size={80}
                    direction="right"
                />
                <Router>
                    <div>
                        <Route exact={true} path="/" component={Game}/>
                        <Route exact={true} path="/analytics" component={Analytics}/>
                    </div>
                </Router>
            </>

        );
    } // <!-- <Route exact path="/analytics/:gameId" component={Analytics}/> -->
}