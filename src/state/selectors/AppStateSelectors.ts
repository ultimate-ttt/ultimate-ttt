import { AnalysisGame, AppState, Player } from '../AppState';

export const getBoards = (state: AppState) => state.currentGame.board;

export const getCurrentPlayer = (state: AppState) =>
  state.currentGame.game.currentPlayer;

export const getWinningPlayer = (state: AppState) =>
  state.currentGame.game.winningPlayer;

export const getMoves = (state: AppState) => state.currentGame.moves;

export const getFinishedGame = (
  state: AppState,
  id: string,
): AnalysisGame | undefined => {
  const finishedGame = state.finishedGames.find((g) => g.id === id);
  if (finishedGame) {
    return {
      moves: finishedGame.moves,
      currentMove: finishedGame.moves.length,
      game: {
        currentPlayer: Player.Circle,
        winningPlayer: finishedGame.winner,
        isFinished: true,
      },
      activeBoards: [],
      board: finishedGame.gameState,
      id: finishedGame.id!,
    };
  }

  return undefined;
};
