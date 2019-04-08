import * as React from 'react';
import { configure, shallow } from 'enzyme';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { MoveList } from './MoveList';
import { Move, Player } from '../../../state/AppState';
import { List } from '@rmwc/list';

configure({ adapter: new ReactSixteenAdapter() });

describe('MoveList', function() {
  const moves: Move[] = [
    {
      moveNumber: 1,
      player: Player.Cross,
      tilePosition: { x: 0, y: 0 },
      boardPosition: { x: 0, y: 0 },
    },
    {
      moveNumber: 2,
      player: Player.Circle,
      tilePosition: { x: 0, y: 1 },
      boardPosition: { x: 0, y: 0 },
    },
    {
      moveNumber: 3,
      player: Player.Cross,
      tilePosition: { x: 0, y: 0 },
      boardPosition: { x: 0, y: 1 },
    },
    {
      moveNumber: 4,
      player: Player.Circle,
      tilePosition: { x: 0, y: 2 },
      boardPosition: { x: 0, y: 0 },
    },
  ].reverse();

  it('should match snapshot', () => {
    // tslint:disable:no-empty
    const moveForwardInHistory = jest.fn((numberOfMoves) => {});
    const moveBackwardInHistory = jest.fn((numberOfMoves) => {});

    const moveList = shallow(
      <MoveList
        reversedMoves={moves}
        currentMove={moves.length}
        moveForwardInHistory={moveForwardInHistory}
        moveBackwardInHistory={moveBackwardInHistory}
      />,
    );

    expect(moveList).toMatchSnapshot();
  });

  it('should display amount of moves in list', () => {
    // tslint:disable:no-empty
    const moveForwardInHistory = jest.fn((numberOfMoves) => {});
    const moveBackwardInHistory = jest.fn((numberOfMoves) => {});

    const moveList = shallow(
      <MoveList
        reversedMoves={moves}
        currentMove={moves.length}
        moveForwardInHistory={moveForwardInHistory}
        moveBackwardInHistory={moveBackwardInHistory}
      />,
    );

    expect(moveList.find(List).children().length).toBe(moves.length);
  });

  it('should set activated to the correct value', () => {
    // tslint:disable:no-empty
    const moveForwardInHistory = jest.fn((numberOfMoves) => {});
    const moveBackwardInHistory = jest.fn((numberOfMoves) => {});

    const currentMove = 3;
    const moveList = shallow(
      <MoveList
        reversedMoves={moves}
        currentMove={currentMove}
        moveForwardInHistory={moveForwardInHistory}
        moveBackwardInHistory={moveBackwardInHistory}
      />,
    );

    const activatedItems = moveList.find({ activated: true });
    const deactivatedItems = moveList.find({ activated: false });

    expect(activatedItems.length).toBe(1);
    expect(activatedItems.get(0).props.text).toContain(currentMove);
    expect(deactivatedItems.length).toBe(moves.length - 1);
  });

  describe('moveBackwardInHistory', () => {
    it('should call backward function with 3 when currentMove is 4 and move 1 is clicked', () => {
      // tslint:disable:no-empty
      const moveForwardInHistory = jest.fn((numberOfMoves) => {});
      const moveBackwardInHistory = jest.fn((numberOfMoves) => {});

      const moveList = shallow(
        <MoveList
          reversedMoves={moves}
          currentMove={moves.length}
          moveForwardInHistory={moveForwardInHistory}
          moveBackwardInHistory={moveBackwardInHistory}
        />,
      );

      const list = moveList.find(List);
      list.props().onAction!({
        detail: moves.findIndex((m) => m.moveNumber === 1),
      } as any);

      expect(moveBackwardInHistory).toHaveBeenCalledWith(moves.length - 1);
    });

    it('should call backward function with 1 when currentMove is 3 and move 2 is clicked', () => {
      // tslint:disable:no-empty
      const moveForwardInHistory = jest.fn((numberOfMoves) => {});
      const moveBackwardInHistory = jest.fn((numberOfMoves) => {});

      const moveList = shallow(
        <MoveList
          reversedMoves={moves}
          currentMove={3}
          moveForwardInHistory={moveForwardInHistory}
          moveBackwardInHistory={moveBackwardInHistory}
        />,
      );

      const list = moveList.find(List);
      list.props().onAction!({
        detail: moves.findIndex((m) => m.moveNumber === 2),
      } as any);

      expect(moveBackwardInHistory).toHaveBeenCalledWith(1);
    });
  });

  describe('moveForwardInHistory', () => {
    it('should call forward function with 3 when currentMove is 1 and move 4 is clicked', () => {
      // tslint:disable:no-empty
      const moveForwardInHistory = jest.fn((numberOfMoves) => {});
      const moveBackwardInHistory = jest.fn((numberOfMoves) => {});

      const moveList = shallow(
        <MoveList
          reversedMoves={moves}
          currentMove={1}
          moveForwardInHistory={moveForwardInHistory}
          moveBackwardInHistory={moveBackwardInHistory}
        />,
      );

      const list = moveList.find(List);
      list.props().onAction!({
        detail: moves.findIndex((m) => m.moveNumber === 4),
      } as any);

      expect(moveForwardInHistory).toHaveBeenCalledWith(3);
    });

    it('should call forward function with 1 when currentMove is 2 and move 3 is clicked', () => {
      // tslint:disable:no-empty
      const moveForwardInHistory = jest.fn((numberOfMoves) => {});
      const moveBackwardInHistory = jest.fn((numberOfMoves) => {});

      const moveList = shallow(
        <MoveList
          reversedMoves={moves}
          currentMove={2}
          moveForwardInHistory={moveForwardInHistory}
          moveBackwardInHistory={moveBackwardInHistory}
        />,
      );

      const list = moveList.find(List);
      list.props().onAction!({
        detail: moves.findIndex((m) => m.moveNumber === 3),
      } as any);

      expect(moveForwardInHistory).toHaveBeenCalledWith(1);
    });
  });
});
