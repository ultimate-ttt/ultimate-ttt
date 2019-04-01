import * as React from 'react';
import { ReactNode } from 'react';
import { BigBoard } from '../components/Board/BigBoard/BigBoard';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import {
    AppState,
    Move,
    Player,
    SmallBoardInformation,
} from '../state/AppState';
import {
    loadFinishedGame,
    moveBackwardInHistory,
    moveForwardInHistory,
} from '../state/analysisGame/analysisGameActions';
import { List, SimpleListItem } from '@rmwc/list';
import './analysis.css';
import { Point } from '../util/Point';
import { CustomEventT } from '@rmwc/types';
import { Button } from '@rmwc/button';

interface AnalysisProps {
    onLoad: ( id: string ) => void;
    moveForwardInHistory: ( numberOfMoves: number ) => void;
    moveBackwardInHistory: ( numberOfMoves: number ) => void;
    reversedMoves?: Move[];
    board: SmallBoardInformation[];
    activeBoards: Point[];
    currentPlayer: Player;
    currentMove: number;
}

export class Analysis extends React.Component<AnalysisProps & RouteComponentProps<{ id: string }>> {
    componentDidMount = () => {
        const id = this.props.match.params.id;
        this.props.onLoad( id );
    };

    playerAsString = ( player: Player ) => {
        if (player === Player.Cross) {
            return 'x';
        } else if (player === Player.Circle) {
            return 'o';
        }
        return undefined;
    };

    getMoves = () => {
        const {reversedMoves, currentMove} = this.props;
        const moveList: ReactNode[] = [];

        reversedMoves!.forEach( ( m: Move ) => {
            moveList.push(
                <SimpleListItem
                    key={m.moveNumber}
                    activated={currentMove === m.moveNumber}
                    graphic={{icon: this.playerAsString( m.player ), size: 'medium'}}
                    text={'Move ' + m.moveNumber}
                    secondaryText={
                        'Board ' +
                        m.boardPosition.x +
                        '/' +
                        m.boardPosition.y +
                        ' - ' +
                        'Field ' +
                        m.tilePosition.x +
                        '/' +
                        m.tilePosition.y
                    }
                />,
            );
        } );
        return moveList;
    };

    changeDisplayedMove = ( event: CustomEventT<number> ) => {
        const {currentMove, reversedMoves} = this.props;

        const numberOfMovesFromEnd = event.detail;
        const moveNumber = reversedMoves!.length - numberOfMovesFromEnd;

        if (moveNumber === currentMove) {
            return;
        }

        const amountOfMovesToMove = moveNumber - currentMove;
        if (amountOfMovesToMove <= -1) {
            this.props.moveBackwardInHistory( currentMove - moveNumber );
        } else {
            this.props.moveForwardInHistory( moveNumber - currentMove );
        }
    };

    render() {
        const {
            reversedMoves,
            board,
            activeBoards,
            currentPlayer,
            currentMove,
        } = this.props;

        return (
            <div className="center">
                <div className="analysisLayout">
                    {reversedMoves && (
                        <div className="moveList">
                            <List
                                // TODO make this it's own component?
                                twoLine={true}
                                dense={true}
                                onAction={this.changeDisplayedMove}
                            >
                                {this.getMoves()}
                            </List>
                        </div>
                    )}
                    <div
                        className="analysisGame"
                        onKeyDown={( event ) => {
                            // TODO these are not always triggering! Maybe need to be added higher up
                            // Or alternatively some library needs to be used..

                            // TODO: "Right" and "Left" has to be checked for aswell because of IE/Edge..
                            if (event.key === 'ArrowLeft' && currentMove !== 1) {
                                this.props.moveBackwardInHistory( 1 );
                            }
                            if (event.key === 'ArrowRight' && reversedMoves
                                && reversedMoves[0] && currentMove !== reversedMoves![0].moveNumber) {
                                this.props.moveForwardInHistory( 1 );
                            }
                        }}
                    >
                        {reversedMoves && (
                            <>
                                <Button
                                    // TODO put these two buttons in their own components and style them
                                    disabled={
                                        currentMove === 1
                                    }
                                    dense={true}
                                    raised={true}
                                    onClick={() => this.props.moveBackwardInHistory( 1 )}
                                >
                                    Previous Move
                                </Button>
                                <Button
                                    disabled={
                                        reversedMoves[0] && currentMove === reversedMoves[0].moveNumber
                                    }
                                    dense={true}
                                    raised={true}
                                    onClick={() => this.props.moveForwardInHistory( 1 )}
                                >
                                    Next Move
                                </Button>
                                <BigBoard
                                    // tslint:disable-next-line:no-empty
                                    onPlayerMoved={() => {
                                    }}
                                    board={board}
                                    activeBoards={activeBoards}
                                    currentPlayer={currentPlayer}
                                    movesAllowed={false}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ( state: AppState ) => ({
    reversedMoves: state.analysisGame.moves.slice().reverse(),
    board: state.analysisGame.board,
    activeBoards: state.analysisGame.activeBoards,
    currentPlayer: state.analysisGame.game.currentPlayer,
    currentMove: state.analysisGame.currentMove,
});

// tslint:disable-next-line: no-any
const mapDispatchToProps = ( dispatch: any ) => ({
    onLoad: ( id: string ) => dispatch( loadFinishedGame( id ) ),
    moveForwardInHistory: ( numberOfMoves: number ) =>
        dispatch( moveForwardInHistory( numberOfMoves ) ),
    moveBackwardInHistory: ( numberOfMoves: number ) =>
        dispatch( moveBackwardInHistory( numberOfMoves ) ),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)( Analysis );
