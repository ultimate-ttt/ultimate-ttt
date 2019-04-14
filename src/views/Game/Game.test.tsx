import * as React from 'react';
import { configure, shallow } from 'enzyme';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { Game } from './Game';
import { Player } from '../../state/AppState';
import { unfinishedBoardMock } from '../../__mocks__';

configure({ adapter: new ReactSixteenAdapter() });

describe('Game', () => {
  it('should match snapshot', () => {
    // tslint:disable:no-empty
    const onPlayerMoved = jest.fn(
      (boardX: number, boardY: number, tileX: number, tileY: number) => {},
    );

    const game = shallow(
      <Game
        currentPlayer={Player.Cross}
        activeBoards={[]}
        board={unfinishedBoardMock}
        onPlayerMoved={onPlayerMoved}
      />,
    );

    expect(game).toMatchSnapshot();
  });
});
