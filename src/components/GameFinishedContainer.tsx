import { connect } from 'react-redux';
import { GameFinished } from './GameFinished';
import { AppState } from '../state/AppState';

const mapStateToProps = ( state: AppState ) => {
    const winResult = {
        isFinished: false,
        winningPlayer: null
    }; // getWinResult( reduceEachSmallBoardToOneValue(state.tiles ) );
    return {
        isGameFinished: winResult.isFinished,
        winner: winResult.winningPlayer
    };
};

export default connect<any>( mapStateToProps )( GameFinished );