import { connect } from 'react-redux';
import { AppState, Player } from '../state/AppState';
import { CurrentPlayerIndicator } from './CurrentPlayerIndicator';
import { getWinResult } from '../util/CheckBoard';
import { reduceEachSmallBoardToOneValue } from '../util/ReduceBoard';

const mapStateToProps = ( state: AppState ) => {
    return {
        isCircle: state.game.currentPlayer === Player.Circle,
        isCross: state.game.currentPlayer === Player.Cross,
        isFinished: getWinResult( reduceEachSmallBoardToOneValue(state.tiles ) ).isFinished
    };
};

export default connect<any>( mapStateToProps )( CurrentPlayerIndicator );