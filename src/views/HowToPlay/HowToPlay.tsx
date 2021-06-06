import * as React from 'react';
import { useHistory } from 'react-router';
import routes from '../../routes/routes';
import { AppState, HowToPlayBoardState } from '../../state/AppState';
import {
  howToPlayClose,
  howToPlayOpen,
  howToPlayStepBackward,
  howToPlayStepForward,
} from '../../state/howToPlay/howToPlayActions';
import { connect } from 'react-redux';
import { HowToPlayDialog } from '../../components/HowToPlay/HowToPlayDialog';
import { getHowToPlay } from '../../state/selectors/AppStateSelectors';
import { getCurrentHowToPlayText } from "../../state/selectors/howToPlay/HowToPlayStateSelectors";

export interface HowToPlayProps {
  stepNumber: number;
  maxStepNumber: number;
  text: React.ReactNode;
  boardState: HowToPlayBoardState;
  onOpen: () => void;
  onClose: () => void;
  onForward: () => void;
  onBackward: () => void;
}

function HowToPlay(props: HowToPlayProps) {
  let history = useHistory();

  function handleClose() {
    props.onClose();
    history.push(routes.Home);
  }

  return (
    <HowToPlayDialog
      boardState={props.boardState}
      onOpen={props.onOpen}
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
  onOpen: () => howToPlayOpen(),
  onClose: () => howToPlayClose(),
  onForward: () => howToPlayStepForward(),
  onBackward: () => howToPlayStepBackward(),
};

export default connect(mapStateToProps, mapDispatchToProps)(HowToPlay);
