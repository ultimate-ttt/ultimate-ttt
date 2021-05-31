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
import { HowToPlayDialog } from '../../components/HowToPlay/Dialog/HowToPlayDialog';

export interface HowToPlayProps {
  stepNumber: number;
  maxStepNumber: number;
  text: string;
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
  boardState: state.howToPlay.boardState,
  stepNumber: state.howToPlay.stepNumber,
  maxStepNumber: state.howToPlay.maxStepNumber,
  text: state.howToPlay.text,
});

const mapDispatchToProps = {
  onOpen: () => howToPlayOpen(),
  onClose: () => howToPlayClose(),
  onForward: () => howToPlayStepForward(),
  onBackward: () => howToPlayStepBackward(),
};

export default connect(mapStateToProps, mapDispatchToProps)(HowToPlay);
