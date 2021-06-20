import analysisGameReducer from './analysisGameReducer';
import {
  moveBackwardInHistory,
  moveForwardInHistory,
  resetAnalysisGame,
  setAnalysisGame,
} from './analysisGameActions';
import {
  activeBoardsForBoardWithOneMoveMock,
  activeBoardsForBoardWithThreeMovesMock,
  activeBoardsForBoardWithTwoMovesMock,
  boardWithOneMoveMock,
  boardWithThreeMovesMock,
  boardWithTwoMovesMock,
  crossFinishedBoardMock,
  movesForBoardWithThreeMovesMock,
  movesForCrossFinishedBoardMock,
} from '../../__mocks__';
import { AnalysisGame, Player, Winner } from '../AppState';

describe('analysisGameReducer', () => {
  it('should return an initial state', () => {
    const initState = analysisGameReducer(undefined, { type: 'init' });
    expect(initState).not.toBeNull();
    expect(initState).not.toBeUndefined();
  });

  describe('resetAnalysisGame', () => {
    it('should return initial state', () => {
      const action = resetAnalysisGame();
      const state: AnalysisGame = {
        id: '0000000',
        board: crossFinishedBoardMock,
        game: {
          isFinished: false,
          currentPlayer: Player.Circle,
          winningPlayer: Winner.Cross,
        },
        moves: movesForCrossFinishedBoardMock,
        activeBoards: [],
        currentMove: 1,
      };
      const actualState = analysisGameReducer(state, action);
      const expectedState = analysisGameReducer(undefined, { type: 'init' });

      expect(expectedState).toEqual(actualState);
    });
  });

  describe('setAnalysisGame', () => {
    it('should set the given analysis game to the state', () => {
      const analysisGame = {
        id: '1',
        board: crossFinishedBoardMock,
        activeBoards: [],
        moves: [
          {
            moveNumber: 1,
            tilePosition: { x: 0, y: 0 },
            boardPosition: { x: 0, y: 0 },
            player: Player.Cross,
          },
        ],
        currentMove: 1,
        game: {
          currentPlayer: Player.Circle,
          winningPlayer: Winner.Cross,
          isFinished: true,
        },
      };
      const action = setAnalysisGame(analysisGame);
      const newState = analysisGameReducer(undefined, action);
      expect(newState).toEqual(analysisGame);
    });
  });

  describe('moveForwardInHistory', () => {
    const analysisGame = {
      id: '1',
      board: boardWithOneMoveMock,
      activeBoards: activeBoardsForBoardWithOneMoveMock,
      moves: movesForBoardWithThreeMovesMock,
      currentMove: 1,
      game: {
        currentPlayer: Player.Circle,
        winningPlayer: Winner.Cross,
        isFinished: true,
      },
    };

    it('calculates the correct board when moving one move forward', () => {
      const action = moveForwardInHistory(1);
      const newState = analysisGameReducer(analysisGame, action);

      expect(newState.currentMove).toBe(2);
      expect(newState.game.currentPlayer).toEqual(Player.Cross);
      expect(newState.activeBoards).toEqual(
        activeBoardsForBoardWithTwoMovesMock,
      );
      expect(newState.board).toEqual(boardWithTwoMovesMock);
    });

    it('calculates the correct board when moving two moves forward', () => {
      const action = moveForwardInHistory(2);
      const newState = analysisGameReducer(analysisGame, action);

      expect(newState.currentMove).toBe(3);
      expect(newState.game.currentPlayer).toEqual(Player.Circle);
      expect(newState.activeBoards).toEqual(
        activeBoardsForBoardWithThreeMovesMock,
      );
      expect(newState.board).toEqual(boardWithThreeMovesMock);
    });

    it('sets no active board when last move is applied', () => {
      analysisGame.moves = movesForCrossFinishedBoardMock;
      const action = moveForwardInHistory(analysisGame.moves.length - 1);
      const newState = analysisGameReducer(analysisGame, action);

      expect(newState.activeBoards).toEqual([]);
    });
  });

  describe('moveBackwardInHistory', () => {
    const analysisGame = {
      id: '1',
      board: boardWithThreeMovesMock,
      activeBoards: activeBoardsForBoardWithThreeMovesMock,
      moves: movesForBoardWithThreeMovesMock,
      currentMove: 3,
      game: {
        currentPlayer: Player.Circle,
        winningPlayer: Winner.Cross,
        isFinished: true,
      },
    };

    it('should calculate the board correctly when moving one move backward', () => {
      const action = moveBackwardInHistory(1);
      const newState = analysisGameReducer(analysisGame, action);

      expect(newState.currentMove).toBe(2);
      expect(newState.game.currentPlayer).toEqual(Player.Cross);
      expect(newState.activeBoards).toEqual(
        activeBoardsForBoardWithTwoMovesMock,
      );
      expect(newState.board).toEqual(boardWithTwoMovesMock);
    });

    it('should calculate the board correctly when moving two moves backward', () => {
      const action = moveBackwardInHistory(2);
      const newState = analysisGameReducer(analysisGame, action);

      expect(newState.currentMove).toBe(1);
      expect(newState.game.currentPlayer).toEqual(Player.Circle);
      expect(newState.activeBoards).toEqual(
        activeBoardsForBoardWithOneMoveMock,
      );
      expect(newState.board).toEqual(boardWithOneMoveMock);
    });
  });
});
