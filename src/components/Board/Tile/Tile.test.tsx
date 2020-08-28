import * as React from 'react';
import { shallow } from 'enzyme';
import { Tile } from './Tile';
import { TileValue } from '../../../state/AppState';
import { XSymbol } from '../../Symbols/XSymbol';
import { OSymbol } from '../../Symbols/OSymbol';
import { DrawSymbol } from '../../Symbols/DrawSymbol';

const position = {
  tilePosition: { x: 0, y: 0 },
  boardPosition: { x: 0, y: 0 },
};

describe('Tile', () => {
  it('should not explode', () => {
    const component = shallow(
      <Tile
        clickable={true}
        isTileRound={true}
        value={TileValue.Empty}
        position={position}
      />,
    );
    expect(component).not.toBeNull();
  });

  describe('display of symbol', () => {
    it('should display an XSymbol if the value is X', () => {
      const component = shallow(
        <Tile
          clickable={false}
          isTileRound={true}
          value={TileValue.Cross}
          position={position}
        />,
      );
      expect(component.find(XSymbol)).toHaveLength(1);
    });

    it('should display an OSymbol if the value is O', () => {
      const component = shallow(
        <Tile
          position={position}
          clickable={false}
          isTileRound={true}
          value={TileValue.Circle}
        />,
      );
      expect(component.find(OSymbol)).toHaveLength(1);
    });

    it('should display a draw symbol if the value is destroyed', () => {
      const component = shallow(
        <Tile
          clickable={false}
          isTileRound={true}
          value={TileValue.Destroyed}
          position={position}
        />,
      );
      expect(component.find(DrawSymbol)).toHaveLength(1);
    });

    it('should display nothing if the value is empty', () => {
      const component = shallow(
        <Tile
          clickable={false}
          isTileRound={true}
          value={TileValue.Empty}
          position={position}
        />,
      );
      expect(component.find(OSymbol)).toHaveLength(0);
      expect(component.find(XSymbol)).toHaveLength(0);
      expect(component.find(DrawSymbol)).toHaveLength(0);
    });
  });

  describe('click event', () => {
    it('should call the click method if it is clickable and it was clicked', () => {
      const tileClicked = jest.fn(() => {});
      const component = shallow(
        <Tile
          clickable={true}
          isTileRound={true}
          value={TileValue.Empty}
          onTileClicked={tileClicked}
          position={position}
        />,
      );

      component.simulate('click');
      expect(tileClicked).toHaveBeenCalledTimes(1);
    });

    it('should NOT call the click method if it is clicked and it is not clickable', () => {
      const tileClicked = jest.fn(() => {});
      const component = shallow(
        <Tile
          clickable={false}
          isTileRound={true}
          value={TileValue.Empty}
          onTileClicked={tileClicked}
          position={position}
        />,
      );

      component.simulate('click');
      expect(tileClicked).toHaveBeenCalledTimes(0);
    });
  });

  describe('how rounded it should be shown', () => {
    it('should have the square class if it is not a circle', () => {
      const component = shallow(
        <Tile
          clickable={true}
          isTileRound={false}
          value={TileValue.Empty}
          position={position}
        />,
      );
      expect(component.hasClass('square')).toBe(true);
      expect(component.hasClass('circle')).toBe(false);
      expect(component.hasClass('noWinner')).toBe(false);
    });

    it('should have the circle class if it is a circle', () => {
      const component = shallow(
        <Tile
          clickable={true}
          isTileRound={true}
          value={TileValue.Empty}
          position={position}
        />,
      );
      expect(component.hasClass('circle')).toBe(true);
      expect(component.hasClass('square')).toBe(false);
      expect(component.hasClass('noWinner')).toBe(false);
    });

    it('should have the noWinner class if the tileValue is Destroyed', () => {
      let component = shallow(
        <Tile
          clickable={true}
          isTileRound={true}
          value={TileValue.Destroyed}
          position={position}
        />,
      );
      expect(component.hasClass('noWinner')).toBe(true);
      expect(component.hasClass('circle')).toBe(false);
      expect(component.hasClass('square')).toBe(false);

      component = shallow(
        <Tile
          clickable={true}
          isTileRound={false}
          value={TileValue.Destroyed}
          position={position}
        />,
      );
      expect(component.hasClass('noWinner')).toBe(true);
      expect(component.hasClass('circle')).toBe(false);
      expect(component.hasClass('square')).toBe(false);
    });
  });

  describe('indicator or no indicator', () => {
    it('should have the indicator class if it is clickable', () => {
      const component = shallow(
        <Tile
          clickable={true}
          isTileRound={true}
          value={TileValue.Empty}
          position={position}
        />,
      );
      expect(component.hasClass('indicator')).toBe(true);
      expect(component.hasClass('normal')).toBe(false);
    });

    it('should have the normal class if it is not clickable', () => {
      const component = shallow(
        <Tile
          clickable={false}
          isTileRound={true}
          value={TileValue.Empty}
          position={position}
        />,
      );
      expect(component.hasClass('normal')).toBe(true);
      expect(component.hasClass('indicator')).toBe(false);
    });

    it('should have the special class if it should be marked specially', () => {
      const component = shallow(
        <Tile
          highlight={true}
          clickable={true}
          isTileRound={true}
          value={TileValue.Empty}
          position={position}
        />,
      );
      expect(component.hasClass('special')).toBe(true);
      expect(component.hasClass('normal')).toBe(false);
      expect(component.hasClass('indicator')).toBe(false);
    });
  });

  describe('animations', () => {
    describe('animate not set or true', () => {
      const params = [undefined, true];

      params.forEach((param) => {
        it('should add animate class to Tile', () => {
          const component = shallow(
            <Tile
              value={TileValue.Empty}
              isTileRound={true}
              clickable={true}
              animate={param}
              position={position}
            />,
          );

          expect(component.hasClass('animate')).toBe(true);
        });

        it('should pass animate=true to symbols', () => {
          const component = shallow(
            <Tile
              value={TileValue.Circle}
              isTileRound={true}
              clickable={true}
              animate={param}
              position={position}
            />,
          );

          expect(component.find(OSymbol).props().shouldAnimate).toBe(true);
        });
      });
    });

    describe('animate set to true', () => {
      it('should not add animate class with animate=false', () => {
        const component = shallow(
          <Tile
            value={TileValue.Empty}
            isTileRound={true}
            clickable={true}
            animate={false}
            position={position}
          />,
        );

        expect(component.hasClass('animate')).toBe(false);
      });

      it('should pass animate=false to symbols', () => {
        const component = shallow(
          <Tile
            value={TileValue.Circle}
            isTileRound={true}
            clickable={true}
            animate={false}
            position={position}
          />,
        );

        expect(component.find(OSymbol).props().shouldAnimate).toBe(false);
      });
    });
  });
});
