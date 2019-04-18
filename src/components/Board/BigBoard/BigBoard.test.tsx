import * as React from 'react';
import { shallow } from 'enzyme';
import { MarkSpecially, Player } from '../../../state/AppState';
import { BigBoard } from './BigBoard';
import {
  circleFinishedBoardMock,
  unfinishedBoardMock,
} from '../../../__mocks__';
import { SmallBoard } from '../SmallBoard/SmallBoard';

describe('BigBoard', function() {
  it('should render 9 small boards', () => {
    // tslint:disable:no-empty
    const playerMoved = jest.fn(() => {});
    const activeBoards = [{ x: 0, y: 0 }];

    const bigBoard = shallow(
      <BigBoard
        currentPlayer={Player.Cross}
        board={unfinishedBoardMock}
        activeBoards={activeBoards}
        onPlayerMoved={playerMoved}
      />,
    );

    expect(bigBoard.children().length).toBe(9);
  });

  it('should match snapshot', () => {
    // tslint:disable:no-empty
    const playerMoved = jest.fn(() => {});
    const activeBoards = [{ x: 0, y: 0 }];

    const bigBoard = shallow(
      <BigBoard
        currentPlayer={Player.Cross}
        board={unfinishedBoardMock}
        activeBoards={activeBoards}
        onPlayerMoved={playerMoved}
      />,
    );

    expect(bigBoard).toMatchSnapshot();
  });

  describe('markSpecially', () => {
    it('should pass undefined to smallBoards if markSpecially is not set', () => {
      // tslint:disable:no-empty
      const playerMoved = jest.fn(() => {});

      const bigBoard = shallow(
        <BigBoard
          currentPlayer={Player.Cross}
          board={circleFinishedBoardMock}
          activeBoards={[]}
          onPlayerMoved={playerMoved}
          markTileSpecially={undefined}
        />,
      );

      const smallBoards = bigBoard.find(SmallBoard);
      smallBoards.forEach((board) => {
        const props = board.props();
        expect(props.markTileSpecially).toBeUndefined();
      });
    });

    it('should pass the correct small board the markSpecially prop', () => {
      // tslint:disable:no-empty
      const playerMoved = jest.fn(() => {});
      const markSpecially: MarkSpecially = {
        condition: true,
        position: {
          boardPosition: { x: 2, y: 1 },
          tilePosition: { x: 0, y: 0 },
        },
      };

      const bigBoard = shallow(
        <BigBoard
          currentPlayer={Player.Cross}
          board={circleFinishedBoardMock}
          activeBoards={[]}
          onPlayerMoved={playerMoved}
          markTileSpecially={markSpecially}
        />,
      );

      const smallBoards = bigBoard.find(SmallBoard);
      smallBoards.forEach((board) => {
        const props = board.props();
        if (props.x === 2 && props.y === 1) {
          expect(props.markTileSpecially).toEqual(markSpecially);
        } else {
          expect(props.markTileSpecially).toEqual({ condition: false });
        }
      });
    });
  });
});
