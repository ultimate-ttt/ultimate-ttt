import * as React from 'react';
import { List, SimpleListItem } from '@rmwc/list';
import { CustomEventT } from '@rmwc/types';
import { MoveState, Player } from '../../../state/AppState';
import { Element } from 'react-scroll';
import { moveScrollElementBaseName } from '../ScrollElementConstants';
import styles from './MoveList.module.css';
import classNames from 'classnames';
import { OIcon, XIcon } from '../../Icons';

export interface MoveListProps {
  reversedMoves: MoveState[];
  currentMove: number;
  moveForwardInHistory: (numberOfMoves: number) => void;
  moveBackwardInHistory: (numberOfMoves: number) => void;
}

export function MoveList(props: MoveListProps) {
  const {
    currentMove,
    reversedMoves,
    moveForwardInHistory,
    moveBackwardInHistory,
  } = props;

  const changeDisplayedMove = (event: CustomEventT<{ index: number }>) => {
    const numberOfMovesFromEnd = event.detail.index;
    const moveNumber = reversedMoves.length - numberOfMovesFromEnd;

    if (moveNumber === currentMove) {
      return;
    }

    const amountOfMovesToMove = moveNumber - currentMove;
    if (amountOfMovesToMove < 0) {
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
      {reversedMoves.map((m) => {
        return (
          <Element
            key={m.moveNumber}
            name={moveScrollElementBaseName + m.moveNumber}
          >
            <SimpleListItem
              tag="button"
              activated={currentMove === m.moveNumber}
              graphic={{
                icon: m.player === Player.Cross ? <XIcon /> : <OIcon />,
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
          </Element>
        );
      })}
    </List>
  );
}
