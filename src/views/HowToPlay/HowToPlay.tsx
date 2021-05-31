import * as React from 'react';
import { useHistory } from 'react-router';
import routes from '../../routes/routes';
import { AppState, Player, SmallBoardInformation } from '../../state/AppState';
import {
  howToPlayClose,
  howToPlayOpen,
  howToPlayStepBackward,
  howToPlayStepForward,
} from '../../state/howToPlay/howToPlayActions';
import { connect } from 'react-redux';
import { HowToPlayDialog } from '../../components/HowToPlay/Dialog/HowToPlayDialog';
import { Point } from '../../util';

export interface HowToPlayProps {
  stepNumber: number;
  maxStepNumber: number;
  animate: boolean;
  text: string;
  board: SmallBoardInformation[];
  currentPlayer: Player;
  activeBoards: Point[];
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
      animate={props.animate}
      onOpen={props.onOpen}
      onClose={handleClose}
      currentPlayer={props.currentPlayer}
      board={props.board}
      activeBoards={props.activeBoards}
      maxStepNumber={props.maxStepNumber}
      stepNumber={props.stepNumber}
      onBackward={props.onBackward}
      onForward={props.onForward}
      text={props.text}
    />
  );
}
const mapStateToProps = (state: AppState) => ({
  animate: state.howToPlay.animate,
  stepNumber: state.howToPlay.stepNumber,
  maxStepNumber: state.howToPlay.maxStepNumber,
  text: state.howToPlay.text,
  board: state.howToPlay.board,
  activeBoards: state.howToPlay.activeBoards,
  currentPlayer: state.howToPlay.currentPlayer,
});

const mapDispatchToProps = {
  onOpen: () => howToPlayOpen(),
  onClose: () => howToPlayClose(),
  onForward: () => howToPlayStepForward(),
  onBackward: () => howToPlayStepBackward(),
};

export default connect(mapStateToProps, mapDispatchToProps)(HowToPlay);
