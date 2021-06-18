import * as React from 'react';
import { render, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import { GameFinishedDisplay } from './GameFinishedDisplay';
import { Winner } from '../../state/AppState';

// TODO: This would be a good candidate for integration tests as we can't fully test this in jsdom

test('renders draw text on draw', () => {
  render(
    <GameFinishedDisplay
      onRestartGame={() => {}}
      isGameFinished={true}
      winner={Winner.Draw}
    />,
  );
  expect(screen.getByText(`It's a draw!`)).toBeInTheDocument();
});

test('should allow clicking restart when game is finished', () => {
  const onRestart = jest.fn();
  render(
    <GameFinishedDisplay
      onRestartGame={onRestart}
      isGameFinished={true}
      winner={Winner.Draw}
    />,
  );

  const button = screen.getByRole('button', { name: /play again/i });
  userEvent.click(button);
  expect(onRestart).toHaveBeenCalled();
});
