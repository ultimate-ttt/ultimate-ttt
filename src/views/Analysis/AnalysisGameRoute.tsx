import * as React from 'react';
import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { AnalysisGame, AppState } from '../../state/AppState';
import { connect } from 'react-redux';
import {
  loadFinishedGame,
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
  moveForwardInHistory: (numberOfMoves: number) => void;
  moveBackwardInHistory: (numberOfMoves: number) => void;
}

export function AnalysisGameRoute(props: AnalysisGameRouteProps) {
  const pathName = props.location.pathname;
  const idParam = props.match.params.param;
  const { loadLatestAnalysisGame, loadAnalysisGameById } = props;

  useEffect(() => {
    if (pathName.includes(appRoutes.AnalysisLatest.path)) {
      loadLatestAnalysisGame();
      // TODO add Date case in a later iteration.
    } else {
      loadAnalysisGameById(idParam);
    }
  }, [pathName, idParam, loadAnalysisGameById, loadLatestAnalysisGame]);

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
  loadAnalysisGameById: (id: string) => dispatch(loadFinishedGame(id)),
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
