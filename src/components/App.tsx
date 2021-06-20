import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Game from '../routes/Game/Game';
import AnalysisGameRoute from '../routes/AnalysisGame/AnalysisGame';
import AnalysisOverview from '../routes/AnalysisOverview/AnalysisOverview';
import routes from '../routes/routes';
import { Navigation } from './Navigation/Navigation';
import HowToPlay from '../views/HowToPlay/HowToPlay';

export class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Navigation />
          <main>
            <Switch>
              <Route
                path={routes.AnalysisLatest}
                component={AnalysisGameRoute}
              />
              <Route
                path={routes.AnalysisParam}
                component={AnalysisGameRoute}
              />
              <Route
                path={routes.AnalysisOverview}
                component={AnalysisOverview}
              />
              <Route path={routes.Home} component={Game} />
            </Switch>
          </main>
        </Router>
      </>
    );
  }
}
