import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, FinishedGameState } from '../../../state/AppState';
import { Typography } from '@rmwc/typography';
import { ListDivider } from '@rmwc/list';
import styles from './AnalysisOverview.module.css';
import appRoutes from '../../../routes/routes';
import { Link } from 'react-router-dom';
import { GameSummaryCard } from '../../../components/Analysis/GameSummaryCard/GameSummaryCard';

interface AnalysisOverviewProps {
  finishedGames: FinishedGameState[];
}

function getLink(game: FinishedGameState) {
  return {
    tag: Link,
    to: appRoutes.AnalysisParam.replace(
      ':param',
      game.id ? game.id : game.date,
    ),
  };
}

export function AnalysisOverview(props: AnalysisOverviewProps) {
  const { finishedGames } = props;

  return (
    <div className={styles.analysisOverviewLayout}>
      <div className={styles.header}>
        <Typography use="headline2" tag="h1">
          Recently played games
        </Typography>
      </div>
      <ListDivider />
      <div className={styles.gameList}>
        {finishedGames.map((game, index) => (
          <GameSummaryCard
            key={game.id ? game.id : game.date}
            gameNumber={finishedGames.length - index}
            game={game}
            link={getLink(game)}
          />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  finishedGames: state.finishedGames.slice().reverse(),
});

export default connect(mapStateToProps)(AnalysisOverview);
