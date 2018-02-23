import { connect } from 'react-redux';
import { SmallBoard } from './SmallBoard';
import { getWinResult } from '../../util/CheckBoard';
import { getSmallBoard } from '../../util/GetSmallBoard';
import { AppState } from '../../state/AppState';

const mapStateToProps = ( state: AppState, ownProps: any ) => {
    const winResult = getWinResult( getSmallBoard( state.tiles, {x: ownProps.x, y: ownProps.y} ) );
    return {
        isFinished: winResult.isFinished,
        winningPlayer: winResult.winningPlayer
    };
};

export default connect<any>( mapStateToProps )( SmallBoard );