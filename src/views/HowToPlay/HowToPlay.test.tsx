import * as React from 'react';
import { mount } from 'enzyme';
import { HowToPlay } from './HowToPlay';
import { Player } from '../../state/AppState';

describe('HowToPlay', () => {
  it('should not explode', () => {
    const howToPlay = mount(
      <HowToPlay
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
    expect(howToPlay).not.toBeNull();
  });
});
