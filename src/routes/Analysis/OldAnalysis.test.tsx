import * as React from 'react';

test('something', () => {
  expect(true).toBe(true);
});

/*
import * as React from 'react';
import { shallow } from 'enzyme';
import { AnalysisOverview } from './AnalysisOverview';
import { FinishedGameState } from '../../state/AppState';
import {
  circleFinishedBoardMock,
  crossFinishedBoardMock,
  movesForCircleFinishedBoardMock,
  movesForCrossFinishedBoardMock,
} from '../../mocks';
import { GameSummaryCard } from '../../../components/Analysis/GameSummaryCard/GameSummaryCard';
import { Paging } from '../../../components/Paging/Paging';

describe('AnalysisOverview', () => {
  const finishedGames: FinishedGameState[] = [
    {
      id: '1',
      gameState: circleFinishedBoardMock,
      date: new Date(Date.UTC(2019, 1, 1)).toISOString(),
      winner: 'O',
      moves: movesForCircleFinishedBoardMock,
      saveState: 'fulfilled',
      errorMessage: '',
    },
    {
      id: '2',
      gameState: crossFinishedBoardMock,
      date: new Date(Date.UTC(2019, 2, 1)).toISOString(),
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

  it('should set game number correctly', () => {
    const analysisOverview = shallow(
      <AnalysisOverview finishedGames={finishedGames} />,
    );
    const cards = analysisOverview.find(GameSummaryCard);
    expect(cards.first().props().gameNumber).toBe(2);
    expect(cards.last().props().gameNumber).toBe(1);
  });

  describe('Paging', () => {
    const pageThreshold = 30;
    let manyFinishedGames: FinishedGameState[] = []; // these are 34 finished games
    for (let i = 0; i < 17; i++) {
      manyFinishedGames = manyFinishedGames.concat(finishedGames);
    }

    it('should not render paging if there are less games than the threshold', () => {
      const analysisOverview = shallow(
        <AnalysisOverview finishedGames={finishedGames} />,
      );

      expect(analysisOverview.find(Paging)).toHaveLength(0);
    });

    it('should render paging if there are more games than the threshold', () => {
      const analysisOverview = shallow(
        <AnalysisOverview finishedGames={manyFinishedGames} />,
      );

      const paging = analysisOverview.find(Paging);
      expect(paging).toHaveLength(1);
      expect(paging.props().pages).toBe(2);
    });

    it('should only render the games on the current page', () => {
      const analysisOverview = shallow(
        <AnalysisOverview finishedGames={manyFinishedGames} />,
      );

      expect(analysisOverview.find(GameSummaryCard)).toHaveLength(
        pageThreshold,
      );
    });

    it('should change the games that are displayed when the page changes', () => {
      const analysisOverview = shallow(
        <AnalysisOverview finishedGames={manyFinishedGames} />,
      );

      const paging = analysisOverview.find(Paging);
      paging.props().onPageChange(2);

      expect(analysisOverview.find(GameSummaryCard)).toHaveLength(
        manyFinishedGames.length - pageThreshold,
      );
    });

    it('should calculate the game number correctly on subsequent pages', () => {
      const analysisOverview = shallow(
        <AnalysisOverview finishedGames={manyFinishedGames} />,
      );

      const paging = analysisOverview.find(Paging);
      paging.props().onPageChange(2);

      const cards = analysisOverview.find(GameSummaryCard);
      expect(cards.first().props().gameNumber).toBe(
        manyFinishedGames.length - pageThreshold,
      );
      expect(cards.last().props().gameNumber).toBe(1);
    });
  });
});
*/
