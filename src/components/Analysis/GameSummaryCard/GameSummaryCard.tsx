import * as React from 'react';
import { BigBoard } from '../../Board/BigBoard/BigBoard';
import {
  Card,
  CardPrimaryAction,
  CardActions,
  CardActionButton,
} from '@rmwc/card';
import { formatDistanceStrict } from 'date-fns';
import { FinishedGameState } from '../../../state/AppState';
import { Typography } from '@rmwc/typography';
import styles from '../../../views/Analysis/Overview/AnalysisOverview.module.css';
import { ListDivider } from '@rmwc/list';
import { Icon } from '@rmwc/icon';
import { Link } from 'react-router-dom';

interface GameSummaryCardProps {
  gameNumber: number;
  game: FinishedGameState;
  link: { tag: typeof Link; to: string };
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
          className={styles.winnerIcon}
        />
        won after {moves} moves.
      </>
    );
  }

  return <>{moves} moves resulted in draw.</>;
}

export function GameSummaryCard(props: GameSummaryCardProps) {
  const { game, gameNumber, link } = props;

  // TODO move all the styling to css file
  // TODO add storybook
  // TODO add tests?!!

  return (
    <Card>
      <CardPrimaryAction style={{ padding: '10px' }} {...link}>
        <div style={{ padding: '10px' }}>
          <div>
            <Typography use={'headline4'}>Game No. {gameNumber}</Typography>
          </div>
          <div>
            <Typography use={'subtitle1'}>
              {getGameSummary(game.winner, game.moves.length)}
            </Typography>
          </div>
          <div style={{ paddingBottom: '10px' }}>
            <Typography use={'subtitle2'} style={{ fontStyle: 'italic' }}>
              {formatDistanceStrict(
                new Date(),
                new Date(Date.parse(game.date)),
              )}{' '}
              ago
            </Typography>
          </div>
          <ListDivider />
        </div>
        <BigBoard
          currentPlayer={game.moves[game.moves.length - 2].player}
          board={game.gameState}
          activeBoards={[]}
          onPlayerMoved={() => {}}
          animate={false}
        />
      </CardPrimaryAction>
      <CardActions>
        <CardActionButton
          label="Analyse Game"
          trailingIcon="arrow-right"
          {...link}
        />
      </CardActions>
    </Card>
  );
}
