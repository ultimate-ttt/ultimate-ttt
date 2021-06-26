import * as React from 'react';
import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { AnalysisGameDisplay } from './AnalysisGameDisplay';
import { parseJSON, isValid } from 'date-fns';
import { AnalysisGame, AppState } from '../../state/AppState';
import routes from '../../routes';
import {
  loadFinishedGameByDate,
  loadFinishedGameById,
  loadLatestFinishedGame,
  moveBackwardInHistory,
  moveForwardInHistory,
} from '../../state/analysisGame/analysisGameActions';
import { NoGameFound } from './NoGameFound/NoGameFound';

interface AnalysisGameRouteProps
  extends RouteComponentProps<{ param: string }> {
  analysisGame: AnalysisGame;
  loadAnalysisGameById: (id: string) => void;
  loadLatestAnalysisGame: () => void;
  loadAnalysisGameByDate: (date: Date) => void;
  moveForwardInHistory: (numberOfMoves: number) => void;
  moveBackwardInHistory: (numberOfMoves: number) => void;
}

function AnalysisGameRoute(props: AnalysisGameRouteProps) {
  // TODO move to hook
  const pathName = props.location.pathname;
  const param = props.match.params.param;
  const {
    loadLatestAnalysisGame,
    loadAnalysisGameById,
    loadAnalysisGameByDate,
    analysisGame,
  } = props;

  useEffect(() => {
    if (pathName.includes(routes.AnalysisLatest)) {
      loadLatestAnalysisGame();
    } else if (isValid(parseJSON(param))) {
      loadAnalysisGameByDate(parseJSON(param));
    } else {
      loadAnalysisGameById(param);
    }
  }, [
    param,
    pathName,
    loadAnalysisGameById,
    loadAnalysisGameByDate,
    loadLatestAnalysisGame,
  ]);

  return analysisGame.board.length > 0 ? (
    <AnalysisGameDisplay
      moveForwardInHistory={props.moveForwardInHistory}
      moveBackwardInHistory={props.moveBackwardInHistory}
      analysisGame={props.analysisGame}
    />
  ) : (
    <NoGameFound />
  );
}

const mapStateToProps = (state: AppState) => ({
  analysisGame: state.analysisGame,
});

const mapDispatchToProps = {
  loadAnalysisGameById: (id: string) => loadFinishedGameById(id),
  loadAnalysisGameByDate: (date: Date) => loadFinishedGameByDate(date),
  loadLatestAnalysisGame: () => loadLatestFinishedGame(),
  moveForwardInHistory: (numberOfMoves: number) =>
    moveForwardInHistory(numberOfMoves),
  moveBackwardInHistory: (numberOfMoves: number) =>
    moveBackwardInHistory(numberOfMoves),
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisGameRoute);
