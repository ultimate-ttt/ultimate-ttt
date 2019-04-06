import * as React from 'react';
import { configure, shallow } from 'enzyme';
import { SmallBoard } from './SmallBoard';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { MarkSpecially, Player, TileValue } from '../../../state/AppState';
import { Point } from '../../../util/Point';
import { Tile } from '../Tile/Tile';

configure({ adapter: new ReactSixteenAdapter() });

function getSmallTile(boardPosition: Point, position: Point, value: TileValue) {
  return {
    boardPosition,
    position,
    value,
  };
}

describe('SmallBoard', () => {
  it('should not explode', () => {
    // tslint:disable:no-empty
    const clicked = jest.fn(() => {});

    const boardPosition = { x: 0, y: 0 };
    const smallTileInformation = [
      getSmallTile(boardPosition, { x: 0, y: 0 }, TileValue.Empty),
      getSmallTile(boardPosition, { x: 0, y: 1 }, TileValue.Empty),
      getSmallTile(boardPosition, { x: 0, y: 2 }, TileValue.Empty),
      getSmallTile(boardPosition, { x: 1, y: 0 }, TileValue.Empty),
      getSmallTile(boardPosition, { x: 1, y: 1 }, TileValue.Empty),
      getSmallTile(boardPosition, { x: 1, y: 2 }, TileValue.Empty),
      getSmallTile(boardPosition, { x: 2, y: 0 }, TileValue.Empty),
      getSmallTile(boardPosition, { x: 2, y: 1 }, TileValue.Empty),
      getSmallTile(boardPosition, { x: 2, y: 2 }, TileValue.Empty),
    ];
    const component = shallow(
      <SmallBoard
        onTileClicked={clicked}
        winningPlayer={TileValue.Empty}
        tiles={smallTileInformation}
        currentPlayer={Player.Cross}
        isMoveAllowed={true}
        x={boardPosition.x}
        y={boardPosition.y}
      />,
    );

    expect(component).not.toBeNull();
  });

  describe('unfinished smallboard', () => {
    it('should display 9 tiles with the given values', () => {
      // tslint:disable:no-empty
      const clicked = jest.fn(() => {});

      const boardPosition = { x: 1, y: 1 };
      const smallTileInformation = [
        getSmallTile(boardPosition, { x: 0, y: 0 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 0, y: 1 }, TileValue.Cross),
        getSmallTile(boardPosition, { x: 0, y: 2 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 1, y: 0 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 1, y: 1 }, TileValue.Circle),
        getSmallTile(boardPosition, { x: 1, y: 2 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 2, y: 0 }, TileValue.Cross),
        getSmallTile(boardPosition, { x: 2, y: 1 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 2, y: 2 }, TileValue.Circle),
      ];
      const component = shallow(
        <SmallBoard
          onTileClicked={clicked}
          winningPlayer={TileValue.Empty}
          tiles={smallTileInformation}
          currentPlayer={Player.Cross}
          isMoveAllowed={true}
          x={boardPosition.x}
          y={boardPosition.y}
        />,
      );

      expect(component.find(Tile)).toHaveLength(9);
      expect(
        component
          .find(Tile)
          .at(1)
          .props().value,
      ).toBe(TileValue.Cross);
      expect(
        component
          .find(Tile)
          .at(8)
          .props().value,
      ).toBe(TileValue.Circle);
    });

    it('should make tiles not clickable if they are taken', () => {
      // tslint:disable:no-empty
      const clicked = jest.fn(() => {});

      const boardPosition = { x: 1, y: 1 };
      const smallTileInformation = [
        getSmallTile(boardPosition, { x: 0, y: 0 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 0, y: 1 }, TileValue.Cross),
        getSmallTile(boardPosition, { x: 0, y: 2 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 1, y: 0 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 1, y: 1 }, TileValue.Circle),
        getSmallTile(boardPosition, { x: 1, y: 2 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 2, y: 0 }, TileValue.Cross),
        getSmallTile(boardPosition, { x: 2, y: 1 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 2, y: 2 }, TileValue.Circle),
      ];
      const component = shallow(
        <SmallBoard
          onTileClicked={clicked}
          winningPlayer={TileValue.Empty}
          tiles={smallTileInformation}
          currentPlayer={Player.Cross}
          isMoveAllowed={true}
          x={boardPosition.x}
          y={boardPosition.y}
        />,
      );

      expect(
        component
          .find(Tile)
          .at(1)
          .props().isClickable,
      ).toBe(false);
      expect(
        component
          .find(Tile)
          .at(4)
          .props().isClickable,
      ).toBe(false);
      expect(
        component
          .find(Tile)
          .at(8)
          .props().isClickable,
      ).toBe(false);
    });

    it('should make tiles not clickable if the move is not allowed', () => {
      // tslint:disable:no-empty
      const clicked = jest.fn(() => {});

      const boardPosition = { x: 2, y: 2 };
      const smallTileInformation = [
        getSmallTile(boardPosition, { x: 0, y: 0 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 0, y: 1 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 0, y: 2 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 1, y: 0 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 1, y: 1 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 1, y: 2 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 2, y: 0 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 2, y: 1 }, TileValue.Cross),
        getSmallTile(boardPosition, { x: 2, y: 2 }, TileValue.Circle),
      ];
      const component = shallow(
        <SmallBoard
          onTileClicked={clicked}
          winningPlayer={TileValue.Empty}
          tiles={smallTileInformation}
          currentPlayer={Player.Cross}
          isMoveAllowed={false}
          x={boardPosition.x}
          y={boardPosition.y}
        />,
      );

      expect(component.find({ isClickable: false })).toHaveLength(9);
    });

    it('should add isTileRound=false when currentPlayer is Cross', () => {
      // tslint:disable:no-empty
      const clicked = jest.fn(() => {});

      const boardPosition = { x: 2, y: 2 };
      const smallTileInformation = [
        getSmallTile(boardPosition, { x: 0, y: 0 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 0, y: 1 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 0, y: 2 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 1, y: 0 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 1, y: 1 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 1, y: 2 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 2, y: 0 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 2, y: 1 }, TileValue.Cross),
        getSmallTile(boardPosition, { x: 2, y: 2 }, TileValue.Circle),
      ];
      const component = shallow(
        <SmallBoard
          onTileClicked={clicked}
          winningPlayer={TileValue.Empty}
          tiles={smallTileInformation}
          currentPlayer={Player.Cross}
          isMoveAllowed={true}
          x={2}
          y={2}
        />,
      );

      expect(component.find({ isTileRound: false })).toHaveLength(9);
    });

    it('should add isTileRound=true when currentPlayer is Circle', () => {
      // tslint:disable:no-empty
      const clicked = jest.fn(() => {});

      const boardPosition = { x: 2, y: 2 };
      const smallTileInformation = [
        getSmallTile(boardPosition, { x: 0, y: 0 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 0, y: 1 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 0, y: 2 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 1, y: 0 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 1, y: 1 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 1, y: 2 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 2, y: 0 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 2, y: 1 }, TileValue.Cross),
        getSmallTile(boardPosition, { x: 2, y: 2 }, TileValue.Circle),
      ];
      const component = shallow(
        <SmallBoard
          onTileClicked={clicked}
          winningPlayer={TileValue.Empty}
          tiles={smallTileInformation}
          currentPlayer={Player.Circle}
          isMoveAllowed={true}
          x={boardPosition.x}
          y={boardPosition.y}
        />,
      );

      expect(component.find({ isTileRound: true })).toHaveLength(9);
    });
  });

  describe('finished smallboard', () => {
    it('should only add one tile if the board is won and that should be a big tile', () => {
      // tslint:disable:no-empty
      const clicked = jest.fn(() => {});

      const boardPosition = { x: 2, y: 2 };
      const smallTileInformation = [
        getSmallTile(boardPosition, { x: 0, y: 0 }, TileValue.Cross),
        getSmallTile(boardPosition, { x: 0, y: 1 }, TileValue.Cross),
        getSmallTile(boardPosition, { x: 0, y: 2 }, TileValue.Cross),
        getSmallTile(boardPosition, { x: 1, y: 0 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 1, y: 1 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 1, y: 2 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 2, y: 0 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 2, y: 1 }, TileValue.Cross),
        getSmallTile(boardPosition, { x: 2, y: 2 }, TileValue.Circle),
      ];
      const component = shallow(
        <SmallBoard
          onTileClicked={clicked}
          winningPlayer={TileValue.Cross}
          tiles={smallTileInformation}
          currentPlayer={Player.Cross}
          isMoveAllowed={false}
          x={boardPosition.x}
          y={boardPosition.y}
        />,
      );

      expect(component.children('Tile')).toHaveLength(1);
      expect(component.find(Tile).props().isBig).toEqual(true);
      expect(component.find(Tile).props().value).toEqual(TileValue.Cross);
    });
  });

  describe('css classes', () => {
    it('should have class small-board-finished when small board is finished', () => {
      // tslint:disable:no-empty
      const clicked = jest.fn(() => {});

      const boardPosition = { x: 2, y: 2 };
      const smallTileInformation = [
        getSmallTile(boardPosition, { x: 0, y: 0 }, TileValue.Cross),
        getSmallTile(boardPosition, { x: 0, y: 1 }, TileValue.Cross),
        getSmallTile(boardPosition, { x: 0, y: 2 }, TileValue.Cross),
        getSmallTile(boardPosition, { x: 1, y: 0 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 1, y: 1 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 1, y: 2 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 2, y: 0 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 2, y: 1 }, TileValue.Cross),
        getSmallTile(boardPosition, { x: 2, y: 2 }, TileValue.Circle),
      ];
      const component = shallow(
        <SmallBoard
          onTileClicked={clicked}
          winningPlayer={TileValue.Cross}
          tiles={smallTileInformation}
          currentPlayer={Player.Cross}
          isMoveAllowed={false}
          x={2}
          y={2}
        />,
      );

      expect(component.hasClass('small-board-finished')).toBe(true);
    });

    it('should have class small-board in normal state', () => {
      // tslint:disable:no-empty
      const clicked = jest.fn(() => {});

      const boardPosition = { x: 2, y: 2 };
      const smallTileInformation = [
        getSmallTile(boardPosition, { x: 0, y: 0 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 0, y: 1 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 0, y: 2 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 1, y: 0 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 1, y: 1 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 1, y: 2 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 2, y: 0 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 2, y: 1 }, TileValue.Cross),
        getSmallTile(boardPosition, { x: 2, y: 2 }, TileValue.Circle),
      ];
      const component = shallow(
        <SmallBoard
          onTileClicked={clicked}
          winningPlayer={TileValue.Empty}
          tiles={smallTileInformation}
          currentPlayer={Player.Cross}
          isMoveAllowed={false}
          x={2}
          y={2}
        />,
      );

      expect(component.hasClass('small-board')).toBe(true);
    });
  });

  describe('mark tile specially', () => {
    it('should add markSpecially=false to all tiles when the condition is false', () => {
      // tslint:disable:no-empty
      const clicked = jest.fn(() => {});

      const boardPosition = { x: 0, y: 0 };
      const smallTileInformation = [
        getSmallTile(boardPosition, { x: 0, y: 0 }, TileValue.Cross),
        getSmallTile(boardPosition, { x: 0, y: 1 }, TileValue.Cross),
        getSmallTile(boardPosition, { x: 0, y: 2 }, TileValue.Cross),
        getSmallTile(boardPosition, { x: 1, y: 0 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 1, y: 1 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 1, y: 2 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 2, y: 0 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 2, y: 1 }, TileValue.Cross),
        getSmallTile(boardPosition, { x: 2, y: 2 }, TileValue.Circle),
      ];

      const markSpecially: MarkSpecially = { condition: false };
      const component = shallow(
        <SmallBoard
          onTileClicked={clicked}
          winningPlayer={TileValue.Empty}
          tiles={smallTileInformation}
          currentPlayer={Player.Cross}
          isMoveAllowed={false}
          x={boardPosition.x}
          y={boardPosition.y}
          markTileSpecially={markSpecially}
        />,
      );

      const speciallyMarkedComponents = component.find({
        markSpecially: false,
      });
      expect(speciallyMarkedComponents).toHaveLength(9);
    });

    it('should add markSpecially=true to the given tile position', () => {
      // tslint:disable:no-empty
      const clicked = jest.fn(() => {});

      const boardPosition = { x: 0, y: 0 };
      const smallTileInformation = [
        getSmallTile(boardPosition, { x: 0, y: 0 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 0, y: 1 }, TileValue.Cross),
        getSmallTile(boardPosition, { x: 0, y: 2 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 1, y: 0 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 1, y: 1 }, TileValue.Circle),
        getSmallTile(boardPosition, { x: 1, y: 2 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 2, y: 0 }, TileValue.Cross),
        getSmallTile(boardPosition, { x: 2, y: 1 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 2, y: 2 }, TileValue.Circle),
      ];

      const markSpecially: MarkSpecially = {
        condition: true,
        position: {
          boardPosition: boardPosition,
          tilePosition: { x: 0, y: 1 },
        },
      };
      const component = shallow(
        <SmallBoard
          onTileClicked={clicked}
          winningPlayer={TileValue.Empty}
          tiles={smallTileInformation}
          currentPlayer={Player.Cross}
          isMoveAllowed={false}
          x={boardPosition.x}
          y={boardPosition.y}
          markTileSpecially={markSpecially}
        />,
      );

      const speciallyMarkedComponents = component.find({ markSpecially: true });
      expect(speciallyMarkedComponents).toHaveLength(1);
      expect(
        component
          .find(Tile)
          .at(1)
          .props().markSpecially,
      ).toBe(true);
    });

    it('should add markSpecially to a finished small board', () => {
      // tslint:disable:no-empty
      const clicked = jest.fn(() => {});

      const boardPosition = { x: 0, y: 0 };
      const smallTileInformation = [
        getSmallTile(boardPosition, { x: 0, y: 0 }, TileValue.Cross),
        getSmallTile(boardPosition, { x: 0, y: 1 }, TileValue.Cross),
        getSmallTile(boardPosition, { x: 0, y: 2 }, TileValue.Cross),
        getSmallTile(boardPosition, { x: 1, y: 0 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 1, y: 1 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 1, y: 2 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 2, y: 0 }, TileValue.Empty),
        getSmallTile(boardPosition, { x: 2, y: 1 }, TileValue.Cross),
        getSmallTile(boardPosition, { x: 2, y: 2 }, TileValue.Circle),
      ];

      const markSpecially: MarkSpecially = {
        condition: true,
        position: {
          boardPosition: boardPosition,
          tilePosition: { x: 0, y: 2 },
        },
      };
      const component = shallow(
        <SmallBoard
          onTileClicked={clicked}
          winningPlayer={TileValue.Cross}
          tiles={smallTileInformation}
          currentPlayer={Player.Cross}
          isMoveAllowed={false}
          x={boardPosition.x}
          y={boardPosition.y}
          markTileSpecially={markSpecially}
        />,
      );

      const speciallyMarkedComponents = component.find({ markSpecially: true });
      expect(speciallyMarkedComponents).toHaveLength(1);
      expect(
        component
          .find(Tile)
          .at(0)
          .props().markSpecially,
      ).toBe(true);
    });
  });
});
