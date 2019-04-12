import { AnalysisGame, AppState, Player } from '../AppState';

export const getAnalysisGame = (
  state: AppState,
  id: string,
): AnalysisGame | undefined => {
  const finishedGame = state.finishedGames.find((g) => g.id === id);
  if (finishedGame) {
    return {
      id: finishedGame.id!,
      board: finishedGame.gameState,
      moves: finishedGame.moves,
      currentMove: finishedGame.moves.length,
      game: {
        currentPlayer: Player.Circle,
        winningPlayer: finishedGame.winner,
        isFinished: true,
      },
      activeBoards: [],
    };
  }

  return undefined;
};
