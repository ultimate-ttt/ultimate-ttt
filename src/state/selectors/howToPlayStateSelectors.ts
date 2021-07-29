import { createSelector } from 'reselect';
import { AppState, HowToPlay } from '../AppState';
import { howToPlaySteps } from '../howToPlay/howToPlaySteps';

export const getHowToPlay = (state: AppState) => state.howToPlay;

export const getCurrentHowToPlayText = createSelector(
  [getHowToPlay],
  (howToPlay: HowToPlay) => {
    return howToPlaySteps[howToPlay.stepNumber].text;
  },
);
