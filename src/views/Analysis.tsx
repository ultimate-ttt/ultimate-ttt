import * as React from 'react';
import { ReactNode } from 'react';
import { BigBoard } from '../components/Board/BigBoard/BigBoard';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { AppState, Move, Player, SmallBoardInformation } from '../state/AppState';
import {
    loadFinishedGame,
    moveBackwardInHistory,
    moveForwardInHistory
} from '../state/analysisGame/analysisGameActions';
import { List, SimpleListItem } from '@rmwc/list';
import './analysis.css';
import { Point } from '../util/Point';
import { CustomEventT } from '@rmwc/types';

interface AnalysisProps {
    onLoad: ( id: string ) => void;
    moveForwardInHistory: ( numberOfMoves: number ) => void;
    moveBackwardInHistory: ( numberOfMoves: number ) => void;
    moves?: Move[];
    board: SmallBoardInformation[];
    activeBoards: Point[];
    currentPlayer: Player;
    currentMove: number;
}

export class Analysis extends React.Component<AnalysisProps & RouteComponentProps<{ id: string }>> {

    componentDidMount = () => {
        const id = this.props.match.params.id;
        this.props.onLoad( id );
    }

    playerAsString = ( player: Player ) => {
        if (player === Player.Cross) {
            return 'x';
        } else if (player === Player.Circle) {
            return 'o';
        }
        return undefined;
    }

    getMoves = () => {
        const {moves, currentMove} = this.props;
        const moveList: ReactNode[] = [];

        moves!.forEach( m => {
            moveList.push(
                <SimpleListItem
                    key={m.moveNumber}
                    activated={currentMove === m.moveNumber}
                    graphic={{icon: this.playerAsString( m.player ), size: 'medium'}}
                    text={'Move ' + m.moveNumber}
                    secondaryText={
                        'Board ' + m.boardPosition.x + '/' + m.boardPosition.y + ' - ' +
                        'Field ' + m.tilePosition.x + '/' + m.tilePosition.y
                    }
                />
            );
        } );
        return moveList;
    }

    changeDisplayedMove = ( event: CustomEventT<number> ) => {
        const {currentMove} = this.props;
        const moveNumber = event.detail + 1;

        if (moveNumber === currentMove) {
            return;
        }

        const amountOfMovesToMove = moveNumber - currentMove;
        if (amountOfMovesToMove <= -1) {
            this.props.moveBackwardInHistory( currentMove - moveNumber );
        } else {
            this.props.moveForwardInHistory( moveNumber - currentMove );
        }
    }

    render() {
        const {moves, board, activeBoards, currentPlayer} = this.props;

        return (
            <div className="center">
                <div className="analysisLayout">
                    {moves && <div className="moveList">
                        <List twoLine={true} dense={true} onAction={this.changeDisplayedMove}>
                            {this.getMoves()}
                        </List>
                    </div>}
                    <div className="analysisGame">
                        {moves && <BigBoard
                            // tslint:disable-next-line:no-empty
                            onPlayerMoved={() => {
                            }}
                            board={board}
                            activeBoards={activeBoards}
                            currentPlayer={currentPlayer}
                            movesAllowed={false}
                        />}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ( state: AppState ) => ({
    moves: state.analysisGame.moves,
    board: state.analysisGame.board,
    activeBoards: state.analysisGame.activeBoards,
    currentPlayer: state.analysisGame.game.currentPlayer,
    currentMove: state.analysisGame.currentMove
});

// tslint:disable-next-line: no-any
const mapDispatchToProps = ( dispatch: any ) => ({
    onLoad: ( id: string ) =>
        dispatch( loadFinishedGame( id ) ),
    moveForwardInHistory: ( numberOfMoves: number ) =>
        dispatch( moveForwardInHistory( numberOfMoves ) ),
    moveBackwardInHistory: ( numberOfMoves: number ) =>
        dispatch( moveBackwardInHistory( numberOfMoves ) )
});

export default connect( mapStateToProps, mapDispatchToProps )( Analysis );