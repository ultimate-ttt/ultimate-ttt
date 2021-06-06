import * as React from 'react';
import { shallow } from 'enzyme';
import { Player } from '../../state/AppState';
import { unfinishedBoardMock } from '../../__mocks__';
import { HowToPlayContent } from './HowToPlayContent';

describe('HowToPlayContent', () => {
  it('should match snapshot', () => {
    const howToPlayContent = shallow(
      <HowToPlayContent
        boardState={{
          board: unfinishedBoardMock,
          activeBoards: [{ x: 0, y: 0 }],
          animate: true,
          currentPlayer: Player.Cross,
        }}
      />,
    );

    expect(howToPlayContent).toMatchSnapshot();
  });
});
