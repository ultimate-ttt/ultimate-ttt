import * as React from 'react';
import { shallow } from 'enzyme';
import { HowToPlay } from './HowToPlay';
import { Player } from '../../state/AppState';

describe('HowToPlay', () => {
  it('should match snapshot', () => {
    const howToPlay = shallow(
      <HowToPlay
        onOpen={() => {}}
        onClose={() => {}}
        onForward={() => {}}
        onBackward={() => {}}
        stepNumber={0}
        maxStepNumber={10}
        text={''}
        boardState={{
          board: [],
          activeBoards: [],
          animate: false,
          currentPlayer: Player.Cross,
        }}
      />,
    );
    expect(howToPlay).toMatchSnapshot();
  });
});
