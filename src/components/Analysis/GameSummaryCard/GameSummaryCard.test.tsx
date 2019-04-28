import * as React from 'react';
import { shallow } from 'enzyme';
import { GameSummaryCard } from './GameSummaryCard';
import {
  circleFinishedBoardMock,
  movesForCircleFinishedBoardMock,
} from '../../../__mocks__';
import { Link } from 'react-router-dom';
import { SaveState, WinnerString } from '../../../state/AppState';

describe('GameSummaryCard', () => {
  it('should match snapshot', () => {
    const game = {
      id: '1',
      gameState: circleFinishedBoardMock,
      date: new Date(2019, 1, 1).toISOString(),
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
