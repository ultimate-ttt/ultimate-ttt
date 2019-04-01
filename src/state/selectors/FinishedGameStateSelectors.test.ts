import {
  getFinishedGameData,
  getWinningPlayerAsString,
} from './FinishedGameStateSelectors';
import { circleFinishedBoardMock } from '../../__mocks__/finishedBoardMock';
import { Player } from '../AppState';

describe('FinishedGameStateSelectors', () => {
  describe('getWinningPlayerAsString', () => {
    it('should return X when player is 0', () => {
      const winningPlayer = 0;

      const selected = getWinningPlayerAsString.resultFunc(winningPlayer);
      expect(selected).toBe('X');
    });

    it('should return O when player is 1', () => {
      const winningPlayer = 1;

      const selected = getWinningPlayerAsString.resultFunc(winningPlayer);
      expect(selected).toBe('O');
    });

    it('should return null when player is null', () => {
      const winningPlayer = null;

      const selected = getWinningPlayerAsString.resultFunc(winningPlayer);
      expect(selected).toBeNull();
    });

    it('should return undefined when player is undefined', () => {
      const winningPlayer = undefined;

      const selected = getWinningPlayerAsString.resultFunc(winningPlayer);
      expect(selected).toBeUndefined();
    });
  });

  describe('getFinishedGameData', () => {
    it('should return an object with all necessary gameData', () => {
      const mockParameters = {
        winningPlayer: 'X' as 'X' | 'O' | null | undefined,
        boards: circleFinishedBoardMock,
        moves: [
          {
            boardPosition: { x: 0, y: 0 },
            tilePosition: { x: 0, y: 0 },
            player: Player.Cross,
            moveNumber: 1,
          },
        ],
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
        date: new Date(),
      };
      expect(selected).toEqual(expectedSelection);
    });
  });
});
