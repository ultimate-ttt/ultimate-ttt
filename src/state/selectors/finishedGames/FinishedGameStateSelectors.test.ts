import {
  getFinishedGameData,
  getWinningPlayerAsString,
} from './FinishedGameStateSelectors';
import {
  circleFinishedBoardMock,
  movesForCircleFinishedBoardMock,
} from '../../../__mocks__';
import { Winner, WinnerString } from '../../AppState';

describe('FinishedGameStateSelectors', () => {
  describe('getWinningPlayerAsString', () => {
    it('should return X when winner is cross', () => {
      const winningPlayer = Winner.Cross;

      const selected = getWinningPlayerAsString.resultFunc(winningPlayer);
      expect(selected).toBe('X');
    });

    it('should return O when winner is circle', () => {
      const winningPlayer = Winner.Circle;

      const selected = getWinningPlayerAsString.resultFunc(winningPlayer);
      expect(selected).toBe('O');
    });

    it('should return null when Winner is draw', () => {
      const winningPlayer = Winner.Draw;

      const selected = getWinningPlayerAsString.resultFunc(winningPlayer);
      expect(selected).toBeNull();
    });

    it('should return undefined when winner is none', () => {
      const winningPlayer = Winner.None;

      const selected = getWinningPlayerAsString.resultFunc(winningPlayer);
      expect(selected).toBeUndefined();
    });
  });

  describe('getFinishedGameData', () => {
    it('should return an object with all necessary gameData', () => {
      const mockParameters = {
        winningPlayer: 'X' as WinnerString | undefined,
        boards: circleFinishedBoardMock,
        moves: movesForCircleFinishedBoardMock,
      };

      const selected = getFinishedGameData.resultFunc(
        mockParameters.winningPlayer,
        mockParameters.boards,
        mockParameters.moves,
      );

      const expectedSelection = {
        winner: mockParameters.winningPlayer,
        gameState: mockParameters.boards,
        moves: mockParameters.moves,
        date: new Date().toISOString(),
      };
      expect(selected).toEqual(expectedSelection);
    });
  });
});
