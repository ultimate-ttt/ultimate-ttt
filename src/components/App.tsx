import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GithubCorner from 'react-github-corner';
import Game from '../views/Game';
import Analysis from '../views/Analysis';

// import individual material component styles here.
import '@material/button/dist/mdc.button.min.css';
import '@material/list/dist/mdc.list.css';
import '@rmwc/icon/icon.css';

export class App extends React.Component {

    lightBlue = window.getComputedStyle( document.body ).getPropertyValue( '--tropical-teal' ).trim();

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
                            <Route exact={true} path="/analysis/:id" component={Analysis}/>
                            <Route path="/" component={Game}/>
                        </div>
                    </Router>
            </>

        ); /* TODO two different components for analytics? */
    }
}
