import * as React from 'react';
import { shallow } from 'enzyme';
import { Game } from './Game';
import { Player } from '../../state/AppState';
import { unfinishedBoardMock } from '../../__mocks__';

describe('Game', () => {
  it('should match snapshot', () => {
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
