import * as React from 'react';
import { shallow } from 'enzyme';
import { SmallBoard } from './SmallBoard';
import { Higlight, Player, TileValue, Highlight } from '../../../state/AppState';
import { Point } from '../../../util';
import { Tile } from '../Tile/Tile';

function getSmallTile(boardPosition: Point, position: Point, value: TileValue) {
  return {
    boardPosition,
    position,
    value,
  };
}

describe('SmallBoard', () => {
  it('should not explode', () => {
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
        moveAllowed={true}
        x={boardPosition.x}
        y={boardPosition.y}
      />,
    );

    expect(component).not.toBeNull();
  });

  describe('unfinished smallboard', () => {
    it('should display 9 tiles with the given values', () => {
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
          moveAllowed={true}
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
          moveAllowed={true}
          x={boardPosition.x}
          y={boardPosition.y}
        />,
      );

      expect(
        component
          .find(Tile)
          .at(1)
          .props().clickable,
      ).toBe(false);
      expect(
        component
          .find(Tile)
          .at(4)
          .props().clickable,
      ).toBe(false);
      expect(
        component
          .find(Tile)
          .at(8)
          .props().clickable,
      ).toBe(false);
    });

    it('should make tiles not clickable if the move is not allowed', () => {
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
          moveAllowed={false}
          x={boardPosition.x}
          y={boardPosition.y}
        />,
      );

      expect(component.find({ clickable: false })).toHaveLength(9);
    });

    it('should add isTileRound=false when currentPlayer is Cross', () => {
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
          moveAllowed={true}
          x={2}
          y={2}
        />,
      );

      expect(component.find({ isTileRound: false })).toHaveLength(9);
    });

    it('should add isTileRound=true when currentPlayer is Circle', () => {
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
          moveAllowed={true}
          x={boardPosition.x}
          y={boardPosition.y}
        />,
      );

      expect(component.find({ isTileRound: true })).toHaveLength(9);
    });
  });

  describe('finished smallboard', () => {
    it('should only add one tile if the board is won and that should be a big tile', () => {
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
          moveAllowed={false}
          x={boardPosition.x}
          y={boardPosition.y}
        />,
      );

      expect(component.children('Tile')).toHaveLength(1);
      expect(component.find(Tile).props().value).toEqual(TileValue.Cross);
    });
  });

  describe('css classes', () => {
    it('should have class smallBoardFinished when small board is finished', () => {
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
          moveAllowed={false}
          x={2}
          y={2}
        />,
      );

      expect(component.hasClass('smallBoardFinished')).toBe(true);
    });

    it('should have class smallBoard in normal state', () => {
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
          moveAllowed={false}
          x={2}
          y={2}
        />,
      );

      expect(component.hasClass('smallBoard')).toBe(true);
    });
  });

  describe('mark tile specially', () => {
    it('should add higlight=false to all tiles when the condition is false', () => {
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

      const highlight: Highlight = { condition: false };
      const component = shallow(
        <SmallBoard
          onTileClicked={clicked}
          winningPlayer={TileValue.Empty}
          tiles={smallTileInformation}
          currentPlayer={Player.Cross}
          moveAllowed={false}
          x={boardPosition.x}
          y={boardPosition.y}
          highlight={highlight}
        />,
      );

      const speciallyMarkedComponents = component.find({
        highlight: false,
      });
      expect(speciallyMarkedComponents).toHaveLength(9);
    });

    it('should add higlight=true to the given tile position', () => {
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

      const highlight: Highlight = {
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
          moveAllowed={false}
          x={boardPosition.x}
          y={boardPosition.y}
          highlight={highlight}
        />,
      );

      const speciallyMarkedComponents = component.find({ higlight: true });
      expect(speciallyMarkedComponents).toHaveLength(1);
      expect(
        component
          .find(Tile)
          .at(1)
          .props().highlight,
      ).toBe(true);
    });

    it('should add higlight to a finished small board', () => {
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

      const highlight: Highlight = {
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
          moveAllowed={false}
          x={boardPosition.x}
          y={boardPosition.y}
          highlight={highlight}
        />,
      );

      const speciallyMarkedComponents = component.find({ highlight: true });
      expect(speciallyMarkedComponents).toHaveLength(1);
      expect(
        component
          .find(Tile)
          .at(0)
          .props().highlight,
      ).toBe(true);
    });
  });
});
