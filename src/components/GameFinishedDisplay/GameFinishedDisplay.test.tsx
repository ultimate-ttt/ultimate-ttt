import * as React from 'react';
import { shallow } from 'enzyme';
import { Winner } from '../../state/AppState';
import { GameFinishedDisplay } from './GameFinishedDisplay';

describe('GameFinished', function () {
  it('should match snapshot when draw', () => {
    const restart = () => {};
    const gameFinishedIndicator = shallow(
      <GameFinishedDisplay
        onRestartGame={restart}
        isGameFinished={true}
        winner={Winner.Draw}
      />,
    );

    expect(gameFinishedIndicator).toMatchSnapshot();
  });

  it('should match snapshot when circle wins', () => {
    const restart = () => {};
    const gameFinishedIndicator = shallow(
      <GameFinishedDisplay
        onRestartGame={restart}
        isGameFinished={true}
        winner={Winner.Circle}
      />,
    );

    expect(gameFinishedIndicator).toMatchSnapshot();
  });

  it('should match snapshot when cross wins', () => {
    const restart = () => {};
    const gameFinishedIndicator = shallow(
      <GameFinishedDisplay
        onRestartGame={restart}
        isGameFinished={true}
        winner={Winner.Cross}
      />,
    );

    expect(gameFinishedIndicator).toMatchSnapshot();
  });

  it('should match snapshot when no one wins', () => {
    const restart = () => {};
    const gameFinishedIndicator = shallow(
      <GameFinishedDisplay
        onRestartGame={restart}
        isGameFinished={false}
        winner={Winner.None}
      />,
    );

    expect(gameFinishedIndicator).toMatchSnapshot();
  });

  it('should handle changing the props correctly', () => {
    const restart = () => {};
    const gameFinishedIndicator = shallow(
      <GameFinishedDisplay
        onRestartGame={restart}
        isGameFinished={true}
        winner={Winner.Cross}
      />,
    );
    expect(gameFinishedIndicator.hasClass('hidden')).toBe(false);
    expect(gameFinishedIndicator.hasClass('visible')).toBe(true);

    gameFinishedIndicator.setProps({
      isGameFinished: false,
      winner: Winner.None,
    });

    expect(gameFinishedIndicator.hasClass('hidden')).toBe(true);
    expect(gameFinishedIndicator.hasClass('visible')).toBe(false);
  });
});
