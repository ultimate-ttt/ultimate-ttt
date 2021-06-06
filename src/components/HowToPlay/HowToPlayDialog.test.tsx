import * as React from 'react';
import { shallow } from 'enzyme';
import { HowToPlayDialog } from './HowToPlayDialog';
import { howToPlaySteps } from '../../state/howToPlay/howToPlaySteps';

describe('HowToPlayDialog', () => {
  it('should match snapshot', () => {
    const step = howToPlaySteps[1];
    const stepState = step.states[0];
    const howToPlayDialog = shallow(
      <HowToPlayDialog
        boardState={{
          board: stepState.getBoard(),
          currentPlayer: stepState.getCurrentPlayer(),
          animate: true,
          activeBoards: stepState.getCurrentActiveBoards(),
        }}
        onOpen={() => {}}
        onClose={() => {}}
        text={step.text}
        onForward={() => {}}
        onBackward={() => {}}
        stepNumber={1}
        maxStepNumber={10}
      />,
    );

    expect(howToPlayDialog).toMatchSnapshot();
  });
});
