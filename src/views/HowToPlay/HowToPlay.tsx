import * as React from 'react';
import { useHistory } from 'react-router';
import routes from '../../routes/routes';
import { AppState, HowToPlayBoardState } from '../../state/AppState';
import {
  howToPlayClose,
  howToPlayStepBackward,
  howToPlayStepForward,
} from '../../state/howToPlay/howToPlayActions';
import { connect } from 'react-redux';
import { getHowToPlay } from '../../state/selectors/appStateSelectors';
import { getCurrentHowToPlayText } from '../../state/selectors/howToPlayStateSelectors';
import { HowToPlayDialog } from './HowToPlayDialog';

export interface HowToPlayProps {
  stepNumber: number;
  maxStepNumber: number;
  text: React.ReactNode;
  boardState: HowToPlayBoardState;
  onClose: () => void;
  onForward: () => void;
  onBackward: () => void;
}

function HowToPlay(props: HowToPlayProps) {
  const history = useHistory();

  function handleClose() {
    props.onClose();
    history.push(routes.Home);
  }

  return (
    <HowToPlayDialog
      boardState={props.boardState}
      onClose={handleClose}
      maxStepNumber={props.maxStepNumber}
      stepNumber={props.stepNumber}
      onBackward={props.onBackward}
      onForward={props.onForward}
      text={props.text}
    />
  );
}

const mapStateToProps = (state: AppState) => ({
  boardState: getHowToPlay(state).boardState,
  stepNumber: getHowToPlay(state).stepNumber,
  maxStepNumber: getHowToPlay(state).maxStepNumber,
  text: getCurrentHowToPlayText(state),
});

const mapDispatchToProps = {
  onClose: () => howToPlayClose(),
  onForward: () => howToPlayStepForward(),
  onBackward: () => howToPlayStepBackward(),
};

export default connect(mapStateToProps, mapDispatchToProps)(HowToPlay);
