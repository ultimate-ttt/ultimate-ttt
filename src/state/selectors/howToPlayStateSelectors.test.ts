import { HowToPlay, Player } from '../AppState';
import { getCurrentHowToPlayText } from './howToPlayStateSelectors';
import { howToPlaySteps } from '../howToPlay/howToPlaySteps';

describe('HowToPlayStateSelectors', () => {
  describe('getCurrentHowToPlayText', () => {
    it('should return text based on stepNumber', () => {
      const howToPlay: HowToPlay = {
        stepNumber: 2,
        stateNumber: 0,
        maxStepNumber: 12,
        boardState: {
          animate: false,
          board: [],
          activeBoards: [],
          currentPlayer: Player.Cross,
        },
      };

      const text = getCurrentHowToPlayText.resultFunc(howToPlay);
      expect(text).toBe(howToPlaySteps[2].text);
    });
  });
});
