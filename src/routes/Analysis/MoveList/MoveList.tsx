import * as React from 'react';
import { List, SimpleListItem } from '@rmwc/list';
import { CustomEventT } from '@rmwc/types';
import { MoveState, Player } from '../../../state/AppState';
import { ScrollElement } from 'react-scroll';
import { moveScrollElementBaseName } from '../ScrollElementConstants';
import styles from './MoveList.module.css';
import classNames from 'classnames';
import { OIcon, XIcon } from "../../../components/Icons";

export interface MoveListProps {
  reversedMoves: MoveState[];
  activatedMove: number;
  onMoveUpwardsInList: (numberOfMoves: number) => void;
  onMoveDownwardsInList: (numberOfMoves: number) => void;
}

export function MoveList(props: MoveListProps) {
  const {
    reversedMoves,
    activatedMove,
    onMoveUpwardsInList,
    onMoveDownwardsInList,
  } = props;

  const changeDisplayedMove = (event: CustomEventT<{ index: number }>) => {
    const numberOfMovesFromEnd = event.detail.index;
    const moveNumber = reversedMoves.length - numberOfMovesFromEnd;

    if (moveNumber === activatedMove) {
      return;
    }

    const amountOfMovesToMove = moveNumber - activatedMove;
    if (amountOfMovesToMove < 0) {
      onMoveUpwardsInList(activatedMove - moveNumber);
    } else {
      onMoveDownwardsInList(moveNumber - activatedMove);
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
          <ScrollListElement
            key={m.moveNumber}
            name={moveScrollElementBaseName + m.moveNumber}
          >
            <SimpleListItem
              tag="button"
              activated={activatedMove === m.moveNumber}
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
                styles.resetIcon,
                styles.smallerMargin,
                styles.biggerIcon,
                styles.fullWidth,
              ])}
            />
          </ScrollListElement>
        );
      })}
    </List>
  );
}

const ListElement: React.FC = ({ children, ...props }) => {
  return <li {...props}>{children}</li>;
};
const ScrollListElement = ScrollElement(ListElement);
