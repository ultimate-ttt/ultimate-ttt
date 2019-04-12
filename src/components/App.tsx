import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Game from '../views/Game/Game';
import AnalysisGame from '../views/Analysis/AnalysisGame';

// import individual material component styles here.
import '@material/button/dist/mdc.button.min.css';
import '@material/list/dist/mdc.list.css';
import '@rmwc/icon/icon.css';

export class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/analysis/:id" exact={true} component={AnalysisGame} />
          <Route path="/" component={Game} />
        </Switch>
      </Router>
    );
  }
}
