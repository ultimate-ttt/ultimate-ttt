export const HOW_TO_PLAY_OPEN = 'howToPlayReducer/how-to-play-open';
export const HOW_TO_PLAY_CLOSE = 'howToPlayReducer/how-to-play-close';
export const HOW_TO_PLAY_STEP_FORWARD =
  'howToPlayReducer/how-to-play-step-forward';
export const HOW_TO_PLAY_STEP_BACKWARD =
  'howToPlayReducer/how-to-play-step-backward';
export const HOW_TO_PLAY_STATE_FORWARD =
  'howToPlayReducer/how-to-play-state-forward';

export const howToPlayOpen = () => ({
  type: HOW_TO_PLAY_OPEN,
});

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
