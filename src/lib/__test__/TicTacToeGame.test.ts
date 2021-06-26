import { TicTacToeGame } from '../TicTacToeGame';
import { Player, TileValue, Winner } from '../../state/AppState';
import {
  boardWithThreeMovesMock,
  boardWithTwoMovesMock,
  movesForBoardWithThreeMovesMock,
  movesForUnfinishedBoardMock,
  movesForDrawFinishedBoardMock,
  movesForCircleFinishedBoardMock,
  movesForCrossFinishedBoardMock,
  activeBoardsForBoardWithThreeMovesMock,
  unfinishedBoardMock,
} from '../../mocks/board';

describe('TicTacToeGame', () => {
  describe('constructor', () => {
    it('should initialize the game', () => {
      const game = new TicTacToeGame([]);
      game.getBoard().forEach((board) => {
        expect(board.value).toEqual(TileValue.Empty);
        board.tiles.forEach((tile) => {
          expect(tile.value).toEqual(TileValue.Empty);
        });
      });

      expect(game.getMoves()).toEqual([]);
    });

    it('should apply the moves given an array of moves', () => {
      const game = new TicTacToeGame(movesForBoardWithThreeMovesMock);

      expect(game.getMoves()).toEqual(movesForBoardWithThreeMovesMock);
      expect(game.getBoard()).toEqual(boardWithThreeMovesMock);
    });

    it('should set the current player to cross', () => {
      const game = new TicTacToeGame([]);

      expect(game.getCurrentPlayer()).toEqual(Player.Cross);
    });
  });

  describe('applyMove', () => {
    it('should apply the given move', () => {
      const game = new TicTacToeGame(
        movesForBoardWithThreeMovesMock.slice(0, 2),
      );
      game.applyMove(movesForBoardWithThreeMovesMock[2]);

      expect(game.getBoard()).toEqual(boardWithThreeMovesMock);
    });
  });

  describe('applyMoves', () => {
    it('should apply the given moves', () => {
      const game = new TicTacToeGame([]);
      game.applyMoves(movesForBoardWithThreeMovesMock.slice(0, 2));

      expect(game.getBoard()).toEqual(boardWithTwoMovesMock);
    });
  });

  describe('getCurrentPlayer', () => {
    it('should return Circle when in second move', () => {
      const game = new TicTacToeGame([]);
      game.applyMove(movesForBoardWithThreeMovesMock[0]);

      expect(game.getCurrentPlayer()).toEqual(Player.Circle);
    });

    it('should return Cross when in third move', () => {
      const game = new TicTacToeGame([]);
      game.applyMove(movesForBoardWithThreeMovesMock[0]);
      game.applyMove(movesForBoardWithThreeMovesMock[1]);

      expect(game.getCurrentPlayer()).toEqual(Player.Cross);
    });
  });

  describe('getWinResult', () => {
    it('should indicate that game is not finished', () => {
      const game = new TicTacToeGame(movesForUnfinishedBoardMock);

      const winResult = game.getWinResult();
      expect(winResult.isFinished).toBe(false);
      expect(winResult.winningPlayer).toBe(Winner.None);
    });

    it('should indicate a draw', () => {
      const game = new TicTacToeGame(movesForDrawFinishedBoardMock);

      const winResult = game.getWinResult();
      expect(winResult.isFinished).toBe(true);
      expect(winResult.winningPlayer).toBe(Winner.Draw);
    });

    it('should indicate that Cross won', () => {
      const game = new TicTacToeGame(movesForCrossFinishedBoardMock);

      const winResult = game.getWinResult();
      expect(winResult.isFinished).toBe(true);
      expect(winResult.winningPlayer).toBe(Winner.Cross);
    });

    it('should indicate that Circle won', () => {
      const game = new TicTacToeGame(movesForCircleFinishedBoardMock);

      const winResult = game.getWinResult();
      expect(winResult.isFinished).toBe(true);
      expect(winResult.winningPlayer).toBe(Winner.Circle);
    });
  });

  describe('getWinResultForSmallBoard', () => {
    it('should indicate that small board is not finished', () => {
      const game = new TicTacToeGame(movesForUnfinishedBoardMock);

      const winResult = game.getWinResultForSmallBoard({ x: 2, y: 2 });
      expect(winResult.isFinished).toBe(false);
      expect(winResult.winningPlayer).toBe(Winner.None);
    });

    it('should indicate that small board resulted in a draw', () => {
      const game = new TicTacToeGame(movesForDrawFinishedBoardMock);

      const winResult = game.getWinResultForSmallBoard({ x: 0, y: 1 });
      expect(winResult.isFinished).toBe(true);
      expect(winResult.winningPlayer).toBe(Winner.Draw);
    });

    it('should indicate that Cross won the small board', () => {
      const game = new TicTacToeGame(movesForDrawFinishedBoardMock);

      const winResult = game.getWinResultForSmallBoard({ x: 0, y: 0 });
      expect(winResult.isFinished).toBe(true);
      expect(winResult.winningPlayer).toBe(Winner.Cross);
    });

    it('should indicate that Circle won the small board', () => {
      const game = new TicTacToeGame(movesForDrawFinishedBoardMock);

      const winResult = game.getWinResultForSmallBoard({ x: 2, y: 2 });
      expect(winResult.isFinished).toBe(true);
      expect(winResult.winningPlayer).toBe(Winner.Circle);
    });
  });

  describe('getCurrentActiveBoards', () => {
    it('should return all boards when no moves were applied', () => {
      const game = new TicTacToeGame([]);

      expect(game.getCurrentActiveBoards()).toHaveLength(9);
    });

    it('should return the current active board when moves were applied', () => {
      const game = new TicTacToeGame(movesForBoardWithThreeMovesMock);

      expect(game.getCurrentActiveBoards()).toEqual(
        activeBoardsForBoardWithThreeMovesMock,
      );
    });

    it('should return all empty when last move points to finished board', () => {
      const game = new TicTacToeGame(movesForUnfinishedBoardMock);

      const emptyBoards = unfinishedBoardMock.filter(
        (b) => b.value === TileValue.Empty,
      ).length;
      expect(game.getCurrentActiveBoards()).toHaveLength(emptyBoards);
    });
  });
});
