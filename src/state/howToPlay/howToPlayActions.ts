export const HOW_TO_PLAY_CLOSE = 'howToPlay/how-to-play-close';
export const HOW_TO_PLAY_STEP_FORWARD =
  'howToPlay/how-to-play-step-forward';
export const HOW_TO_PLAY_STEP_BACKWARD =
  'howToPlay/how-to-play-step-backward';
export const HOW_TO_PLAY_STATE_FORWARD =
  'howToPlay/how-to-play-state-forward';

export const howToPlayClose = () => ({
  type: HOW_TO_PLAY_CLOSE,
});

export const howToPlayStepForward = () => ({
  type: HOW_TO_PLAY_STEP_FORWARD,
});

export const howToPlayStepBackward = () => ({
  type: HOW_TO_PLAY_STEP_BACKWARD,
});

export const howToPlayStateForward = () => ({
  type: HOW_TO_PLAY_STATE_FORWARD,
});
