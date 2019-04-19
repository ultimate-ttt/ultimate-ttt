import { AnalysisGame, AppState, FinishedGameState } from '../../AppState';
import { createSelector } from 'reselect';
import { getFinishedGames } from '../AppStateSelectors';

const mapFinishedGameToAnalysisGame = (
  finishedGame: FinishedGameState,
): AnalysisGame => {
  return {
    id: finishedGame.id!,
    board: finishedGame.gameState,
    moves: finishedGame.moves,
    currentMove: finishedGame.moves.length,
    game: {
      currentPlayer: finishedGame.moves[finishedGame.moves.length - 2].player,
      winningPlayer: finishedGame.winner,
      isFinished: true,
    },
    activeBoards: [],
  };
};

export const getIdToFetch = (state: AppState, id: string) => id;

export const getAnalysisGameById = createSelector(
  [getFinishedGames, getIdToFetch],
  (finishedGames, id): AnalysisGame | undefined => {
    const finishedGame = finishedGames.find((g) => g.id === id);
    if (finishedGame) {
      return mapFinishedGameToAnalysisGame(finishedGame);
    }

    return undefined;
  },
);

export const getLatestAnalysisGame = createSelector(
  [getFinishedGames],
  (finishedGames: FinishedGameState[]): AnalysisGame | undefined => {
    if (finishedGames.length > 0) {
      const latestFinishedGame = finishedGames[finishedGames.length - 1];
      return mapFinishedGameToAnalysisGame(latestFinishedGame);
    }

    return undefined;
  },
);
