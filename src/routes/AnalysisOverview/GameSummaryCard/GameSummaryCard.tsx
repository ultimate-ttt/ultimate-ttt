import * as React from 'react';
import { Card, CardActions, CardActionButton } from '@rmwc/card';
import { formatDistanceStrict } from 'date-fns';
import { FinishedGameState } from '../../../state/AppState';
import { Typography } from '@rmwc/typography';
import { ListDivider } from '@rmwc/list';
import { Icon } from '@rmwc/icon';
import { Link } from 'react-router-dom';
import styles from './GameSummaryCard.module.css';
import { ArrowRightIcon, OIcon, XIcon } from '../../../components/Icons';
import { BigBoard } from '../../../components/Board/BigBoard/BigBoard';

export interface GameSummaryCardProps {
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
            icon: winner === 'X' ? <XIcon /> : <OIcon />,
            size: 'small',
            'aria-label': winner,
          }}
          className={styles.winnerIcon}
        />
        won after {moves} moves.
      </>
    );
  }

  return <>{moves} moves resulted in a draw.</>;
}

export function GameSummaryCard(props: GameSummaryCardProps) {
  const { game, gameNumber, link } = props;

  return (
    <Card>
      <div className={styles.padding10}>
        <div>
          <Typography use={'headline4'} tag="h2">
            Game No. {gameNumber}
          </Typography>
        </div>
        <div>
          <Typography use={'subtitle2'} tag="h3">
            {getGameSummary(game.winner, game.moves.length)}
          </Typography>
        </div>
        <div className={styles.paddingBot10}>
          <Typography use={'subtitle2'} tag="p" className={styles.italic}>
            {formatDistanceStrict(new Date(), new Date(Date.parse(game.date)))}{' '}
            ago
          </Typography>
        </div>
        <ListDivider tag="div" />
      </div>
      <div className={styles.padding10}>
        <a className="sr-only" href={`#analyse-button-${gameNumber}`}>
          Skip Board Declaration
        </a>
        <BigBoard
          currentPlayer={game.moves[game.moves.length - 2].player}
          board={game.gameState}
          activeBoards={[]}
          animate={false}
        />
      </div>
      <CardActions>
        <CardActionButton
          id={`analyse-button-${gameNumber}`}
          label="Analyse Game"
          trailingIcon={{ icon: <ArrowRightIcon />, 'aria-hidden': true }}
          {...link}
        />
      </CardActions>
    </Card>
  );
}
