import { createSelector } from 'reselect';
import { getHowToPlay } from '../AppStateSelectors';
import { HowToPlay } from '../../AppState';
import { howToPlaySteps } from '../../howToPlay/howToPlaySteps';

// TODO move selectors in respective subdir and remove /state/selectors dir to simplify structure
// best to do it in separate PR so that the review of this one doesn't get difficult

export const getCurrentHowToPlayText = createSelector(
  [getHowToPlay],
  (howToPlay: HowToPlay) => {
    return howToPlaySteps[howToPlay.stepNumber].text;
  },
);
