import { createSelector } from 'reselect';
import { getHowToPlay } from './appStateSelectors';
import { HowToPlay } from '../AppState';
import { howToPlaySteps } from '../howToPlay/howToPlaySteps';

export const getCurrentHowToPlayText = createSelector(
  [getHowToPlay],
  (howToPlay: HowToPlay) => {
    return howToPlaySteps[howToPlay.stepNumber].text;
  },
);
