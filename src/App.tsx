import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './routes/routes';
import { Navigation } from './components/Navigation/Navigation';
import AnalysisGameRoute from './views/AnalysisGame/AnalysisGame';
import AnalysisOverview from './views/AnalysisOverview/AnalysisOverview';
import Game from './views/Game/Game';
import HowToPlay from './views/HowToPlay/HowToPlay';

export const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <main>
        <Switch>
          <Route path={routes.AnalysisLatest} component={AnalysisGameRoute} />
          <Route path={routes.AnalysisParam} component={AnalysisGameRoute} />
          <Route path={routes.AnalysisOverview} component={AnalysisOverview} />
          <Route path={routes.Home} component={Game} />
        </Switch>
        <Route path={routes.HowToPlay} component={HowToPlay} />
      </main>
    </BrowserRouter>
  );
};
