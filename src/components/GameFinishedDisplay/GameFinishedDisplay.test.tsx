import * as React from 'react';
import { configure, shallow } from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { Winner } from '../../state/AppState';
import { GameFinishedDisplay } from './GameFinishedDisplay';

configure({ adapter: new ReactSixteenAdapter() });

describe('GameFinished', function() {
  it('should match snapshot when draw', () => {
    // tslint:disable-next-line:no-empty
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
    // tslint:disable-next-line:no-empty
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
    // tslint:disable-next-line:no-empty
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
    // tslint:disable-next-line:no-empty
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
    // tslint:disable-next-line:no-empty
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

    gameFinishedIndicator.setProps({isGameFinished: false, winner: Winner.None});

    expect(gameFinishedIndicator.hasClass('hidden')).toBe(true);
    expect(gameFinishedIndicator.hasClass('visible')).toBe(false);
  });
});
