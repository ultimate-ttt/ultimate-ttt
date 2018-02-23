import { connect } from 'react-redux';
import { getWinResult } from '../util/CheckBoard';
import { reduceEachSmallBoardToOneValue } from '../util/ReduceBoard';
import { GameFinished } from './GameFinished';
import { AppState } from '../state/AppState';

const mapStateToProps = ( state: AppState ) => {
    const winResult = getWinResult( reduceEachSmallBoardToOneValue(state.tiles ) );
    return {
        isGameFinished: winResult.isFinished,
        winner: winResult.winningPlayer
    };
};

export default connect<any>( mapStateToProps )( GameFinished );