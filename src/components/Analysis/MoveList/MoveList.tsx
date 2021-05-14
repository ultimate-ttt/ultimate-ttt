import * as React from 'react';
import { ReactNode } from 'react';
import { List, SimpleListItem } from '@rmwc/list';
import { CustomEventT } from '@rmwc/types';
import { MoveState, Player } from '../../../state/AppState';
import { Element } from 'react-scroll';
import { moveScrollElementBaseName } from '../ScrollElementConstants';
import styles from './MoveList.module.css';
import classNames from 'classnames';
import { OGameIcon, XGameIcon } from '../../Icons';

export interface MoveListProps {
  reversedMoves: MoveState[];
  currentMove: number;
  moveForwardInHistory: (numberOfMoves: number) => void;
  moveBackwardInHistory: (numberOfMoves: number) => void;
}

export function MoveList(props: MoveListProps) {
  const getMoves = () => {
    const { reversedMoves, currentMove } = props;
    const moveList: ReactNode[] = [];

    reversedMoves.forEach((m: MoveState) => {
      moveList.push(
        <Element
          key={m.moveNumber}
          name={moveScrollElementBaseName + m.moveNumber}
        >
          <SimpleListItem
            tag="button"
            activated={currentMove === m.moveNumber}
            graphic={{
              icon: m.player === Player.Cross ? <XGameIcon /> : <OGameIcon />,
              size: 'medium',
              'aria-label': `Player ${
                m.player === Player.Cross ? 'X' : 'O'
              } Icon`,
            }}
            text={'Move ' + m.moveNumber}
            secondaryText={`Board ${m.boardPosition.x}/${m.boardPosition.y} - Tile ${m.tilePosition.x}/${m.tilePosition.y}`}
            className={classNames([
              styles.smallerMargin,
              styles.biggerIcon,
              styles.fullWidth,
            ])}
          />
        </Element>,
      );
    });

    return moveList;
  };

  const changeDisplayedMove = (event: CustomEventT<{ index: number }>) => {
    const {
      currentMove,
      reversedMoves,
      moveForwardInHistory,
      moveBackwardInHistory,
    } = props;

    const numberOfMovesFromEnd = event.detail.index;
    const moveNumber = reversedMoves.length - numberOfMovesFromEnd;

    if (moveNumber === currentMove) {
      return;
    }

    const amountOfMovesToMove = moveNumber - currentMove;
    if (amountOfMovesToMove <= -1) {
      moveBackwardInHistory(currentMove - moveNumber);
    } else {
      moveForwardInHistory(moveNumber - currentMove);
    }
  };

  return (
    <List
      twoLine={true}
      dense={true}
      onAction={changeDisplayedMove}
      className={styles.noPadding}
    >
      {getMoves()}
    </List>
  );
}
