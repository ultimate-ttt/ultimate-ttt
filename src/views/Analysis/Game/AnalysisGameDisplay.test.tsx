import * as React from 'react';
import { shallow } from 'enzyme';
import {
  circleFinishedBoardMock,
  movesForCircleFinishedBoardMock,
} from '../../../__mocks__';
import { Player, Winner } from '../../../state/AppState';
import { AnalysisGameDisplay } from './AnalysisGameDisplay';

// tslint:disable:no-empty
describe('AnalysisGame', () => {
  it('should match snapshot', () => {
    const moveForwardInHistory = jest.fn((numberOfMoves) => {});
    const moveBackwardInHistory = jest.fn((numberOfMoves) => {});

    const analysis = shallow(
      <AnalysisGameDisplay
        moveForwardInHistory={moveForwardInHistory}
        moveBackwardInHistory={moveBackwardInHistory}
        analysisGame={{
          board: circleFinishedBoardMock,
          activeBoards: [],
          currentMove:
            movesForCircleFinishedBoardMock[
              movesForCircleFinishedBoardMock.length - 1
            ].moveNumber,
          game: {
            currentPlayer: Player.Cross,
            isFinished: true,
            winningPlayer: Winner.Circle,
          },
          moves: movesForCircleFinishedBoardMock,
          id: '1',
        }}
      />,
    );

    expect(analysis).toMatchSnapshot();
  });
});
