import * as React from 'react';
import { List, SimpleListItem } from '@rmwc/list';
import { CustomEventT } from '@rmwc/types';
import { Move, Player } from '../../state/AppState';
import { ReactNode } from 'react';
import { Element } from 'react-scroll';
import { moveScrollElementBaseName } from './ScrollElementConstants';

interface MoveListProps {
  reversedMoves: Move[];
  currentMove: number;
  moveForwardInHistory: (numberOfMoves: number) => void;
  moveBackwardInHistory: (numberOfMoves: number) => void;
}

export class MoveList extends React.Component<MoveListProps> {
  playerAsString = (player: Player) => {
    if (player === Player.Cross) {
      return 'x';
    } else if (player === Player.Circle) {
      return 'o';
    }
    return undefined;
  };

  getMoves = () => {
    const { reversedMoves, currentMove } = this.props;
    const moveList: ReactNode[] = [];

    reversedMoves.forEach((m: Move) => {
      moveList.push(
        <Element
          key={m.moveNumber}
          name={moveScrollElementBaseName + m.moveNumber}
        >
          <SimpleListItem
            activated={currentMove === m.moveNumber}
            graphic={{ icon: this.playerAsString(m.player), size: 'small' }}
            text={'Move ' + m.moveNumber}
            secondaryText={
              'Board ' +
              m.boardPosition.x +
              '/' +
              m.boardPosition.y +
              ' - ' +
              'Field ' +
              m.tilePosition.x +
              '/' +
              m.tilePosition.y
            }
          />
        </Element>,
      );
    });

    return moveList;
  };

  changeDisplayedMove = (event: CustomEventT<number>) => {
    const {
      currentMove,
      reversedMoves,
      moveForwardInHistory,
      moveBackwardInHistory,
    } = this.props;

    const numberOfMovesFromEnd = event.detail;
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

  render() {
    return (
      <List twoLine={true} dense={true} onAction={this.changeDisplayedMove}>
        {this.getMoves()}
      </List>
    );
  }
}
