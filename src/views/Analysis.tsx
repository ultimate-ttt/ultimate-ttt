import * as React from 'react';
import BigBoard from '../components/Board/BigBoard/BigBoard';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { AppState } from '../state/AppState';
import { loadFinishedGame } from '../state/analysisGame/analysisGameActions';

interface AnalysisProps {
    onLoad: (id: string) => void;
}

export class Analysis extends React.Component<AnalysisProps & RouteComponentProps<{id: string}>> {

    componentDidMount = () => {
        const id = this.props.match.params.id;
        this.props.onLoad(id);
    }

    render() {
        return (
            <div className="center">
                <BigBoard movesAllowed={false}/>
            </div>
        );
    }
}

const mapStateToProps = ( state: AppState ) => ({

});

// tslint:disable-next-line: no-any
const mapDispatchToProps = ( dispatch: any ) => ({
    onLoad: (id: string) =>
        dispatch( loadFinishedGame(id))
});

export default connect( mapStateToProps, mapDispatchToProps )( Analysis );

// TODO connect to state and dispatch action to load game.