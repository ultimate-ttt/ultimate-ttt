import * as React from 'react';
import { shallow } from 'enzyme';
import { GameSummaryCard } from './GameSummaryCard';
import {
  circleFinishedBoardMock,
  movesForCircleFinishedBoardMock,
} from '../../../mocks';
import { Link } from 'react-router-dom';
import { SaveState, WinnerString } from '../../../state/AppState';

describe('GameSummaryCard', () => {
  it('should match snapshot', () => {
    let date = new Date();
    date.setDate(date.getDate() - 3);

    const game = {
      id: '1',
      gameState: circleFinishedBoardMock,
      date: date.toISOString(),
      winner: 'O' as WinnerString,
      moves: movesForCircleFinishedBoardMock,
      saveState: 'fulfilled' as SaveState,
      errorMessage: '',
    };

    const card = shallow(
      <GameSummaryCard
        gameNumber={1}
        game={game}
        link={{ tag: Link, to: '/a/location' }}
      />,
    );

    expect(card).toMatchSnapshot();
  });
});
