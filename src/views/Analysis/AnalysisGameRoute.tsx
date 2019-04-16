import * as React from 'react';
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

// TODO Hooks and function component
// TODO add tests (public api!!!)
export class AnalysisGameRoute extends React.Component<AnalysisGameRouteProps> {
  componentDidMount = () => {
    const path = this.props.location.pathname;
    // tslint:disable-next-line:no-console
    console.log(path);
    if (path.includes('latest')) {
      this.props.loadLatestAnalysisGame();
      // TODO add Date case in a later iteration.
    } else {
      this.props.loadAnalysisGameById(path);
    }
  };

  render() {
    return (
      <AnalysisGameDisplay
        moveForwardInHistory={this.props.moveForwardInHistory}
        moveBackwardInHistory={this.props.moveBackwardInHistory}
        analysisGame={this.props.analysisGame}
      />
    );
  }
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
