import { connect } from 'react-redux';
import { SmallBoard } from './SmallBoard';
import { getWinResult } from '../../../util/CheckBoard';
import { getSmallBoard } from '../../../util/GetSmallBoard';
import { AppState } from '../../../state/AppState';

type OwnProps = {
    x: number;
    y: number;
};

const mapStateToProps = ( state: AppState, ownProps: OwnProps ) => {
    const winResult = getWinResult( getSmallBoard( state.tiles, {x: ownProps.x, y: ownProps.y} ) );
    return {
        isFinished: winResult.isFinished,
        winningPlayer: winResult.winningPlayer
    };
};

// tslint:disable-next-line: no-any
export default connect<any>( mapStateToProps )( SmallBoard );