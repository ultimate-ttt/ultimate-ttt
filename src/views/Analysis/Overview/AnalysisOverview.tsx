import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, FinishedGameState } from '../../../state/AppState';
import { Typography } from '@rmwc/typography';
import styles from './AnalysisOverview.module.css';
import routes from '../../../routes/routes';
import { parseJSON } from 'date-fns';
import { Link } from 'react-router-dom';
import { GameSummaryCard } from '../../../components/Analysis/GameSummaryCard/GameSummaryCard';
import { Paging } from '../../../components/Paging/Paging';
import { useState } from 'react';
import { NoGameFound } from '../NoGameFound';

interface AnalysisOverviewProps {
  finishedGames: FinishedGameState[];
}

function getLink(game: FinishedGameState) {
  let param: string;
  if (game.id) {
    param = game.id;
  } else {
    const date = parseJSON(game.date);
    param = date.toISOString();
  }

  return {
    tag: Link,
    to: routes.AnalysisParam.replace(':param', param),
  };
}

const gamesPerPage = 30;

export function AnalysisOverview(props: AnalysisOverviewProps) {
  const { finishedGames } = props;

  const [currentGames, setCurrentGames] = useState(
    finishedGames.slice(0, gamesPerPage),
  );
  const [currentPage, setCurrentPage] = useState(0);
  const amountOfPages = Math.ceil(finishedGames.length / gamesPerPage);

  return (
    <div className={styles.analysisOverviewLayout}>
      <div className={styles.header}>
        <Typography use="headline2" tag="h1">
          Recently played games
        </Typography>
      </div>
      {currentGames.length > 0 ? (
        <div className={styles.gameList}>
          {currentGames.map((game, index) => (
            <GameSummaryCard
              key={game.id ? game.id : game.date}
              gameNumber={
                finishedGames.length - (index + currentPage * gamesPerPage)
              }
              game={game}
              link={getLink(game)}
            />
          ))}
        </div>
      ) : (
          <NoGameFound tag="h2" size="headline4" className={styles.noGameFound}>
            No recently played games were found
          </NoGameFound>
        )}
      {amountOfPages > 1 && (
        <Paging
          className={styles.paging}
          pageToStartWith={1}
          pages={amountOfPages}
          onPageChange={(newPage) => {
            const startGameNumber = (newPage - 1) * gamesPerPage;
            setCurrentGames(
              finishedGames.slice(
                startGameNumber,
                startGameNumber + gamesPerPage,
              ),
            );
            setCurrentPage(newPage - 1);
          }}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  finishedGames: state.finishedGames.slice().reverse(),
});

export default connect(mapStateToProps)(AnalysisOverview);
