import * as React from 'react';
import { AppState, FinishedGameState } from '../../../state/AppState';
import { connect } from 'react-redux';
import {
  Card,
  CardPrimaryAction,
  CardActions,
  CardActionButton,
} from '@rmwc/card';
import { Typography } from '@rmwc/typography';
import { ListDivider } from '@rmwc/list';
import styles from './AnalysisOverview.module.css';
import { BigBoard } from '../../../components/Board/BigBoard/BigBoard';
import { Icon } from '@rmwc/icon';

interface AnalysisOverviewProps {
  finishedGames: FinishedGameState[];
}

function getGameSummary(winner: 'X' | 'O' | null, moves: number) {
  if (winner) {
    return (
      <>
        <Icon
          icon={{
            icon: winner.toLowerCase(),
            size: 'medium',
          }}
          aria-label={winner}
        />
        won after {moves} moves.
      </>
    );
  }

  return <>{moves} moves resulted in a draw.</>;
}

export function AnalysisOverview(props: AnalysisOverviewProps) {
  const { finishedGames } = props;

  // TODO: don't animate the symbols on the bigBoard
  // TODO: add dynamic game time information
  // TODO: make bigBoard sizing dynamic
  // TODO add proper index for filtering and paging later
  // TODO: Break this out into multiple components
  // TODO: make link to /analysis/:id or /analysis/:date working

  return (
    <div className="center">
      <div className={styles.analysisOverviewLayout}>
        <div className={styles.header}>
          <Typography use="headline1" tag="h1">
            Your recently played games
          </Typography>
        </div>
        <div className={styles.gameList}>
          {finishedGames.map((game, index) => (
            <Card key={game.id ? game.id : index}>
              <CardPrimaryAction style={{ padding: '10px' }}>
                <div style={{ padding: '10px' }}>
                  <div>
                    <Typography use={'headline4'}>
                      Game No. {finishedGames.length - index}
                    </Typography>
                  </div>
                  <div>
                    <Typography use={'subtitle1'}>
                      {getGameSummary(game.winner, game.moves.length)}
                    </Typography>
                  </div>
                  <div style={{ paddingBottom: '10px' }}>
                    <Typography
                      use={'subtitle2'}
                      style={{ fontStyle: 'italic' }}
                    >
                      10 minutes ago
                    </Typography>
                  </div>
                  <ListDivider />
                </div>

                <BigBoard
                  currentPlayer={game.moves[game.moves.length - 2].player}
                  board={game.gameState}
                  activeBoards={[]}
                  onPlayerMoved={() => {}}
                />
              </CardPrimaryAction>
              <CardActions>
                <CardActionButton
                  label="Analyse Game"
                  trailingIcon="arrow-right"
                />
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  finishedGames: state.finishedGames.slice().reverse(),
});

export default connect(mapStateToProps)(AnalysisOverview);
