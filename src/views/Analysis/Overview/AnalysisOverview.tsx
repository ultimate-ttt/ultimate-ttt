import * as React from 'react';
import { AppState, FinishedGameState } from '../../../state/AppState';
import { connect } from 'react-redux';
import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardActions,
  CardActionButton,
} from '@rmwc/card';
import { Typography } from '@rmwc/typography';
import styles from './AnalysisOverview.module.css';
import { BigBoard } from '../../../components/Board/BigBoard/BigBoard';

interface AnalysisOverviewProps {
  finishedGames: FinishedGameState[];
}

export function AnalysisOverview(props: AnalysisOverviewProps) {
  const { finishedGames } = props;
  const finishedGame = finishedGames[0];

  // TODO: don't animate the symbols on the bigBoard
  // TODO: add more game information to the card
  //  -> (when it was played: displayed as 10 minutes ago for example)
  // TODO: improve layout
  return (
    <div className="center">
      <div className={styles.analysisOverviewLayout}>
        <div className={styles.header}>
          <Typography use="headline1">Your recently played games</Typography>
        </div>
        <div className={styles.gameList}>
          <Card style={{ width: '40vmin' }}>
            <CardPrimaryAction style={{ padding: '10px' }}>
              <CardMedia>
                <BigBoard
                  currentPlayer={
                    finishedGame.moves[finishedGame.moves.length - 2].player
                  }
                  board={finishedGame.gameState}
                  activeBoards={[]}
                  onPlayerMoved={() => {}}
                />
              </CardMedia>
            </CardPrimaryAction>
            <CardActions>
              <CardActionButton
                label="Analyse Game"
                trailingIcon="arrow-right"
              />
            </CardActions>
          </Card>
        </div>
      </div>
    </div>
  );
}

/*
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
 */

const mapStateToProps = (state: AppState) => ({
  finishedGames: state.finishedGames.slice().reverse(),
});

export default connect(mapStateToProps)(AnalysisOverview);
