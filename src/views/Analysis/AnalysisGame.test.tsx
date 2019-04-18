import * as React from 'react';
import { configure, shallow } from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { AnalysisGame } from './AnalysisGame';
import { circleFinishedBoardMock } from '../../__mocks__';
import { Player } from '../../state/AppState';

configure({ adapter: new ReactSixteenAdapter() });

describe('AnalysisGame', () => {
  it('should match snapshot', () => {
    // tslint:disable:no-empty
    const onLoad = jest.fn((id) => {});
    const moveForwardInHistory = jest.fn((numberOfMoves) => {});
    const moveBackwardInHistory = jest.fn((numberOfMoves) => {});
    const mock: any = jest.fn();
    const match = {
      isExact: true,
      params: {
        id: 'someId',
      },
      path: '',
      url: '',
    };

    const analysis = shallow(
      <AnalysisGame
        onLoad={onLoad}
        moveForwardInHistory={moveForwardInHistory}
        moveBackwardInHistory={moveBackwardInHistory}
        board={circleFinishedBoardMock}
        activeBoards={[]}
        currentPlayer={Player.Cross}
        currentMove={1}
        history={mock}
        location={mock}
        match={match}
      />,
    );

    expect(analysis).toMatchSnapshot();
  });

  it('should call onLoad with givenId when mounted', () => {
    // tslint:disable:no-empty
    const onLoad = jest.fn((id) => {});
    const moveForwardInHistory = jest.fn((numberOfMoves) => {});
    const moveBackwardInHistory = jest.fn((numberOfMoves) => {});
    const mock: any = jest.fn();
    const match = {
      isExact: true,
      params: {
        id: '123',
      },
      path: '',
      url: '',
    };

    shallow(
      <AnalysisGame
        onLoad={onLoad}
        moveForwardInHistory={moveForwardInHistory}
        moveBackwardInHistory={moveBackwardInHistory}
        board={circleFinishedBoardMock}
        activeBoards={[]}
        currentPlayer={Player.Cross}
        currentMove={1}
        history={mock}
        location={mock}
        match={match}
      />,
    );

    expect(onLoad).toHaveBeenCalledWith('123');
  });
});
