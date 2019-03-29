import * as React from 'react';
import BigBoard from '../components/Board/BigBoard/BigBoard';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { AppState, Move } from '../state/AppState';
import { loadFinishedGame } from '../state/analysisGame/analysisGameActions';
import { List, ListItem } from '@rmwc/list';
import { ReactNode } from 'react';
import './analysis.css';

interface AnalysisProps {
    onLoad: ( id: string ) => void;
    moves?: Move[];
}

export class Analysis extends React.Component<AnalysisProps & RouteComponentProps<{ id: string }>> {

    componentDidMount = () => {
        const id = this.props.match.params.id;
        this.props.onLoad( id );
    }

    getMoves = () => {
        const {moves} = this.props;

        const moveList: ReactNode[] = [];

        moves!.forEach( m => {
            if (m.moveNumber < 25) {
                moveList.push(
                    <ListItem key={m.moveNumber}>
                        Player: {m.player} Move: {m.moveNumber}
                    </ListItem>
                );
            }
        } );
        return moveList;
    }

    render() {
        const {moves} = this.props;

        return (
            <div className="center">
                <div className="analysisLayout">
                    {moves && <div className="moveList">
                        <List>
                            {this.getMoves()}
                        </List>
                    </div>}
                    <div className="analysisGame">
                        <BigBoard movesAllowed={false}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ( state: AppState ) => ({
    moves: state.analysisGame.moves
});

// tslint:disable-next-line: no-any
const mapDispatchToProps = ( dispatch: any ) => ({
    onLoad: ( id: string ) =>
        dispatch( loadFinishedGame( id ) )
});

export default connect( mapStateToProps, mapDispatchToProps )( Analysis );