import {
  circleFinishedBoardMock,
  crossFinishedBoardMock,
  drawFinishedBoardMock,
  movesForCircleFinishedBoardMock,
  movesForCrossFinishedBoardMock,
  movesForDrawFinishedBoardMock,
} from '../../../__mocks__';
import {
  AnalysisGame,
  FinishedGameState,
  Player,
  Winner,
} from '../../AppState';
import {
  getAnalysisGameById,
  getLatestAnalysisGame,
} from './AnalysisGameStateSelectors';

describe('AnalysisGameStateSelectors', () => {
  const finishedGames: FinishedGameState[] = [
    {
      id: '1',
      gameState: circleFinishedBoardMock,
      date: new Date(2019, 1, 1).toISOString(),
      winner: Winner.Circle,
      moves: movesForCircleFinishedBoardMock,
      saveState: 'fulfilled',
      errorMessage: '',
    },
    {
      id: '2',
      gameState: crossFinishedBoardMock,
      date: new Date(2019, 2, 1).toISOString(),
      winner: Winner.Cross,
      moves: movesForCrossFinishedBoardMock,
      saveState: 'fulfilled',
      errorMessage: '',
    },
    {
      id: '3',
      gameState: drawFinishedBoardMock,
      date: new Date(2019, 3, 1).toISOString(),
      winner: Winner.Draw,
      moves: movesForDrawFinishedBoardMock,
      saveState: 'fulfilled',
      errorMessage: '',
    },
  ];

  describe('getAnalysisGameById', () => {
    it('returns analysis game by id', () => {
      const originalFinishedGame = finishedGames[0];
      const expectedGame: AnalysisGame = {
        id: '1',
        currentMove: originalFinishedGame.moves.length,
        moves: originalFinishedGame.moves,
        board: originalFinishedGame.gameState,
        game: {
          winningPlayer: originalFinishedGame.winner,
          isFinished: true,
          currentPlayer: Player.Cross,
        },
        activeBoards: [],
      };

      const analysisGame = getAnalysisGameById.resultFunc(finishedGames, '1');

      expect(analysisGame).toEqual(expectedGame);
    });

    it('returns undefined when no game was found', () => {
      const result = getAnalysisGameById.resultFunc(finishedGames, '42');
      expect(result).toBeUndefined();
    });
  });

  describe('getLatestAnalysisGame', () => {
    it('returns the newest analysis game', () => {
      const originalFinishedGame = finishedGames[2];
      const expectedGame: AnalysisGame = {
        id: '3',
        currentMove: originalFinishedGame.moves.length,
        moves: originalFinishedGame.moves,
        board: originalFinishedGame.gameState,
        game: {
          winningPlayer: originalFinishedGame.winner,
          isFinished: true,
          currentPlayer: Player.Circle,
        },
        activeBoards: [],
      };

      const analysisGame = getLatestAnalysisGame.resultFunc(finishedGames);
      expect(analysisGame).toEqual(expectedGame);
    });

    it('returns undefined when no game was found', () => {
      const result = getLatestAnalysisGame.resultFunc([]);
      expect(result).toBeUndefined();
    });
  });
});
