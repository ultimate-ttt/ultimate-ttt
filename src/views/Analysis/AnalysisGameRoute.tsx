import * as React from 'react';
import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { AnalysisGame, AppState } from '../../state/AppState';
import { connect } from 'react-redux';
import {
  loadFinishedGameByDate,
  loadFinishedGameById,
  loadLatestFinishedGame,
  moveBackwardInHistory,
  moveForwardInHistory,
} from '../../state/analysisGame/analysisGameActions';
import { AnalysisGameDisplay } from './AnalysisGameDisplay';
import appRoutes from '../../routes/routes';

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
  } = props;

  useEffect(() => {
    if (pathName.includes(appRoutes.AnalysisLatest)) {
      loadLatestAnalysisGame();
    } else if (!isNaN(Date.parse(param))) {
      loadAnalysisGameByDate(new Date(Date.parse(param)));
    } else {
      loadAnalysisGameById(param);
    }
  }, [
    pathName,
    param,
    loadAnalysisGameById,
    loadAnalysisGameByDate,
    loadLatestAnalysisGame,
  ]);

  return (
    <AnalysisGameDisplay
      moveForwardInHistory={props.moveForwardInHistory}
      moveBackwardInHistory={props.moveBackwardInHistory}
      analysisGame={props.analysisGame}
    />
  );
}

const mapStateToProps = (state: AppState) => ({
  analysisGame: state.analysisGame,
});

const mapDispatchToProps = (dispatch: any) => ({
  loadAnalysisGameById: (id: string) => dispatch(loadFinishedGameById(id)),
  loadAnalysisGameByDate: (date: Date) =>
    dispatch(loadFinishedGameByDate(date)),
  loadLatestAnalysisGame: () => dispatch(loadLatestFinishedGame()),
  moveForwardInHistory: (numberOfMoves: number) =>
    dispatch(moveForwardInHistory(numberOfMoves)),
  moveBackwardInHistory: (numberOfMoves: number) =>
    dispatch(moveBackwardInHistory(numberOfMoves)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnalysisGameRoute);
