import { AnalysisGame, AppState, FinishedGameState, Player } from '../AppState';

const mapFinishedGameToAnalysisGame = (finishedGame: FinishedGameState) => {
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
};

export const getAnalysisGameById = (
  state: AppState,
  id: string,
): AnalysisGame | undefined => {
  const finishedGame = state.finishedGames.find((g) => g.id === id);
  if (finishedGame) {
    return mapFinishedGameToAnalysisGame(finishedGame);
  }

  return undefined;
};

export const getLatestAnalysisGame = (
  state: AppState,
): AnalysisGame | undefined => {
  if (state.finishedGames.length > 0) {
    const latestFinishedGame =
      state.finishedGames[state.finishedGames.length - 1];
    return mapFinishedGameToAnalysisGame(latestFinishedGame);
  }

  return undefined;
};
