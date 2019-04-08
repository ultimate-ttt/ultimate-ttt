import { AnalysisGame, AppState, Player } from '../AppState';

export const getAnalysisGame = (
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