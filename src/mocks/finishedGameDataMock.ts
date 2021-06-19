import {
  circleFinishedBoardMock,
  crossFinishedBoardMock,
} from './finishedBoardMock';

export const crossFinishedGameMock = {
  winner: 'X',
  gameState: crossFinishedBoardMock,
  // not real data
  moves: [
    {
      boardPosition: {
        x: 1,
        y: 0,
      },
      tilePosition: {
        x: 1,
        y: 1,
      },
      player: 0,
      moveNumber: 1,
    },
  ],
};

export const circleFinishedGameMock = {
  winner: 'O',
  gameState: circleFinishedBoardMock,
  // not real data
  moves: [
    {
      boardPosition: {
        x: 1,
        y: 0,
      },
      tilePosition: {
        x: 1,
        y: 1,
      },
      player: 0,
      moveNumber: 1,
    },
  ],
};
