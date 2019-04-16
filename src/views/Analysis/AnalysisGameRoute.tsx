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

interface AnalysisGameRouteProps extends RouteComponentProps<{ id: string }> {
  analysisGame: AnalysisGame;
  loadAnalysisGameById: (id: string) => void;
  loadLatestAnalysisGame: () => void;
  moveForwardInHistory: (numberOfMoves: number) => void;
  moveBackwardInHistory: (numberOfMoves: number) => void;
}

// TODO add tests for the public api
export function AnalysisGameRoute(props: AnalysisGameRouteProps) {
  useEffect(() => {
    if (props.location.pathname.includes('latest')) {
      props.loadLatestAnalysisGame();

      // TODO add Date case in a later iteration.
    } else {
      props.loadAnalysisGameById(props.match.params.id);
    }
  }, [
    props.location.pathname,
    props.match.params.id,
    props.loadAnalysisGameById,
    props.loadLatestAnalysisGame,
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
