import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, FinishedGameState } from '../../../state/AppState';
import { Typography } from '@rmwc/typography';
import { ListDivider } from '@rmwc/list';
import styles from './AnalysisOverview.module.css';
import appRoutes from '../../../routes/routes';
import { Link } from 'react-router-dom';
import { GameSummaryCard } from '../../../components/Analysis/GameSummaryCard/GameSummaryCard';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import { useState } from 'react';

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

const listSize = 50;
const newItems = 30;

export function AnalysisOverview(props: AnalysisOverviewProps) {
  const [listItems, setListItems] = useState(
    props.finishedGames.slice(0, listSize),
  );
  const [, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

  // TODO: why doesn't it add the items to the list and still stays at the last old item??
  function fetchMoreListItems() {
    setListItems((prevState) =>
      prevState.concat(
        props.finishedGames.slice(
          prevState.length,
          prevState.length + newItems,
        ),
      ),
    );
    setIsFetching(false);
  }

  return (
    <div className={styles.analysisOverviewLayout}>
      <div className={styles.header}>
        <Typography use="headline2" tag="h1">
          Recently played games
        </Typography>
      </div>
      <ListDivider />
      <div className={styles.gameList}>
        {listItems.map((game, index) => (
          <GameSummaryCard
            key={game.id ? game.id : game.date}
            gameNumber={props.finishedGames.length - index}
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
