import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Game from '../views/Game/Game';
import AnalysisGameRoute from '../views/Analysis/AnalysisGameRoute';

// import individual material component styles here.
import '@material/button/dist/mdc.button.min.css';
import '@material/list/dist/mdc.list.css';
import '@rmwc/icon/icon.css';

export class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/analysis/latest"
            exact={true}
            component={AnalysisGameRoute}
          />
          <Route
            path="/analysis/:id"
            exact={true}
            component={AnalysisGameRoute}
          />
          <Route path="/" component={Game} />
        </Switch>
      </Router>
    );
  }
}
