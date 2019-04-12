import { arePointsEqual, Point } from './Point';
import { SmallBoardInformation, TileValue } from '../state/AppState';

export const getNewActiveBoards = (
  lastMove: Point,
  boards: SmallBoardInformation[],
) => {
  let activeBoards = [lastMove];
  const boardLastMovePointsTo = boards.find((board: SmallBoardInformation) =>
    arePointsEqual(board.position, lastMove),
  );
  const boardIsFinished = boardLastMovePointsTo!.value !== TileValue.Empty;
  if (boardIsFinished) {
    const allUnfinishedBoards = boards.filter(
      (board: SmallBoardInformation) => board.value === TileValue.Empty,
    );
    activeBoards = allUnfinishedBoards.map(
      (board: SmallBoardInformation) => board.position,
    );
  }

  return activeBoards;
};
