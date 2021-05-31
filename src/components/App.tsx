import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Game from '../views/Game/Game';
import AnalysisGameRoute from '../views/Analysis/Game/AnalysisGameRoute';
import AnalysisOverview from '../views/Analysis/Overview/AnalysisOverview';
import routes from '../routes/routes';
import { Navigation } from './Navigation/Navigation';
import HowToPlay from '../views/HowToPlay/HowToPlay';

// import individual material component styles here.
import '@material/theme/dist/mdc.theme.css';
import '@material/button/dist/mdc.button.min.css';
import '@material/card/dist/mdc.card.css';
import '@material/dialog/dist/mdc.dialog.css';
import '@material/drawer/dist/mdc.drawer.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import '@material/list/dist/mdc.list.css';
import '@material/ripple/dist/mdc.ripple.css';
import '@material/top-app-bar/dist/mdc.top-app-bar.css';
import '@material/typography/dist/mdc.typography.css';
import '@rmwc/icon/icon.css';
import '@rmwc/theme/theme.css';

export function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <main>
          <Switch>
            <Route path={routes.AnalysisLatest} component={AnalysisGameRoute} />
            <Route path={routes.AnalysisParam} component={AnalysisGameRoute} />
            <Route
              path={routes.AnalysisOverview}
              component={AnalysisOverview}
            />
            <Route path={routes.Home} component={Game} />
          </Switch>
          <Route path={routes.HowToPlay} component={HowToPlay} />
        </main>
      </BrowserRouter>
    </>
  );
}
