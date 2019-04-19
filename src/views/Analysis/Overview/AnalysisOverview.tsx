import * as React from 'react';
import { AppState, FinishedGameState } from '../../../state/AppState';
import { connect } from 'react-redux';
import { List, SimpleListItem } from '@rmwc/list';

interface AnalysisOverviewProps {
  finishedGames: FinishedGameState[];
}

export function AnalysisOverview(props: AnalysisOverviewProps) {
  const { finishedGames } = props;

  return (
    <div className="center">
      <List>
        {finishedGames.map((g, index) => {
          return (
            <SimpleListItem
              key={g.id ? g.id : index}
              graphic={{
                icon: g.winner === null ? 'draw' : g.winner.toLowerCase(),
                size: 'small',
              }}
            >
              {g.date}
            </SimpleListItem>
          );
        })}
      </List>
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  finishedGames: state.finishedGames.slice().reverse(),
});

export default connect(mapStateToProps)(AnalysisOverview);
