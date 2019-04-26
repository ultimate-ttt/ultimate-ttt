import * as React from 'react';
import { shallow } from 'enzyme';
import { AnalysisOverview } from './AnalysisOverview';
import { FinishedGameState } from '../../../state/AppState';
import {
  circleFinishedBoardMock,
  crossFinishedBoardMock,
  movesForCircleFinishedBoardMock,
  movesForCrossFinishedBoardMock,
} from '../../../__mocks__';
import { GameSummaryCard } from '../../../components/Analysis/GameSummaryCard/GameSummaryCard';

describe('AnalysisOverview', () => {
  const finishedGames: FinishedGameState[] = [
    {
      id: '1',
      gameState: circleFinishedBoardMock,
      date: new Date(2019, 1, 1, 10).toISOString(),
      winner: 'O',
      moves: movesForCircleFinishedBoardMock,
      saveState: 'fulfilled',
      errorMessage: '',
    },
    {
      id: '2',
      gameState: crossFinishedBoardMock,
      date: new Date(2019, 2, 1, 10).toISOString(),
      winner: 'X',
      moves: movesForCrossFinishedBoardMock,
      saveState: 'fulfilled',
      errorMessage: '',
    },
  ];

  it('should match snapshot', () => {
    const analysisOverview = shallow(
      <AnalysisOverview finishedGames={finishedGames} />,
    );

    expect(analysisOverview).toMatchSnapshot();
  });

  it('should render all given finished games', () => {
    const analysisOverview = shallow(
      <AnalysisOverview finishedGames={finishedGames} />,
    );

    expect(analysisOverview.find(GameSummaryCard)).toHaveLength(
      finishedGames.length,
    );
  });
});
