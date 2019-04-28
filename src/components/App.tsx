import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Game from '../views/Game/Game';
import AnalysisGameRoute from '../views/Analysis/Game/AnalysisGameRoute';
import AnalysisOverview from '../views/Analysis/Overview/AnalysisOverview';
import appRoutes from '../routes/routes';

// import individual material component styles here.
import '@material/button/dist/mdc.button.min.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import '@material/list/dist/mdc.list.css';
import '@material/card/dist/mdc.card.css';
import '@material/typography/dist/mdc.typography.css';
import '@rmwc/icon/icon.css';

export class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path={appRoutes.AnalysisLatest}
            component={AnalysisGameRoute}
          />
          <Route path={appRoutes.AnalysisParam} component={AnalysisGameRoute} />
          <Route
            path={appRoutes.AnalysisOverview}
            component={AnalysisOverview}
          />
          <Route path={appRoutes.Home} component={Game} />
        </Switch>
      </Router>
    );
  }
}
