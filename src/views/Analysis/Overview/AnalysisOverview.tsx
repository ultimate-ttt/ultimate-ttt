import * as React from 'react';
import { AppState, FinishedGameState } from '../../../state/AppState';
import { connect } from 'react-redux';
import { List, SimpleListItem } from '@rmwc/list';
import styles from './AnalysisOverview.module.css';

interface AnalysisOverviewProps {
  finishedGames: FinishedGameState[];
}

export function AnalysisOverview(props: AnalysisOverviewProps) {
  const { finishedGames } = props;

  return (
    <div className="center">
      <div className={styles.analysisOverviewLayout}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Your recently played games</h1>
        </div>
        <div className={styles.gameList}>
          <List>
            {finishedGames.map((g, index) => {
              return (
                <SimpleListItem
                  key={g.id ? g.id : index}
                  graphic={{
                    icon: g.winner === null ? 'draw' : g.winner.toLowerCase(),
                    size: 'large',
                  }}
                  text={'Game No. ' + index}
                  secondaryText={'10 minutes ago'}
                />
              );
            })}
          </List>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  finishedGames: state.finishedGames.slice().reverse(),
});

export default connect(mapStateToProps)(AnalysisOverview);
