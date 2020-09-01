import * as React from 'react';
import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { AnalysisGame, AppState } from '../../../state/AppState';
import { connect } from 'react-redux';
import {
  loadFinishedGameByDate,
  loadFinishedGameById,
  loadLatestFinishedGame,
  moveBackwardInHistory,
  moveForwardInHistory,
} from '../../../state/analysisGame/analysisGameActions';
import routes from '../../../routes/routes';
import { AnalysisGameDisplay } from './AnalysisGameDisplay';
import { NoGameFound } from '../NoGameFound';
import { parseJSON, isValid } from 'date-fns';

interface AnalysisGameRouteProps
  extends RouteComponentProps<{ param: string }> {
  analysisGame: AnalysisGame;
  loadAnalysisGameById: (id: string) => void;
  loadLatestAnalysisGame: () => void;
  loadAnalysisGameByDate: (date: Date) => void;
  moveForwardInHistory: (numberOfMoves: number) => void;
  moveBackwardInHistory: (numberOfMoves: number) => void;
}

export function AnalysisGameRoute(props: AnalysisGameRouteProps) {
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
    <NoGameFound tag="h1" center={true} />
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
