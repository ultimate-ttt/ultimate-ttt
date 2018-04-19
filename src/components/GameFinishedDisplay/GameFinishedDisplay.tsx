import * as React from 'react';
import { AppState, Player } from '../../state/AppState';
import { connect } from 'react-redux';
import { XSymbol } from '../symbols/XSymbol';
import { OSymbol } from '../symbols/OSymbol';
import Confetti from 'react-dom-confetti';
import Button from 'material-ui/Button';
import { restartGame } from '../../state/commonAction';

interface GameFinishedDisplayProps {
    isGameFinished: boolean;
    winner: Player;
    restartGame: () => void;
}

interface GameFinishedDisplayState {
}

export class GameFinishedDisplay extends React.Component<GameFinishedDisplayProps, GameFinishedDisplayState> {

    constructor( props: GameFinishedDisplayProps ) {
        super( props );
    }

    getWinnerText( player: Player, isGameFinished: boolean ) {

        if (isGameFinished) {
            const fontSize = {
                fontSize: '4.5vmin'
            };
            if (player === Player.Circle) {
                return (<><OSymbol style={fontSize} shouldAnimate={false}/> wins!</>);
            } else if (player === Player.Cross) {
                return (<><XSymbol style={fontSize} shouldAnimate={false}/> wins!</>);
            } else {
                return `It's a draw!`;
            }
        }

        // this will be hidden
        // it's there so that the board doesn't shift down when it's displayed
        return <><XSymbol shouldAnimate={false}/>some text</>;
    }

    getHiddenStyle( isGameFinished: boolean ) {
        if (!isGameFinished) {
            return {
                visibility: 'hidden'
            };
        }
        return {};
    }

    render() {
        const {isGameFinished, winner, restartGame} = this.props;

        const winnerText = this.getWinnerText( winner, isGameFinished );
        // so that the board doesn't go down when I show the winner text
        const hiddenStyle = this.getHiddenStyle( isGameFinished );

        const confettiConfig = {
            elementCount: 250,
            spread: 360,
            startVelocity: 35,
            decay: 0.97
        };

        return (
            <>
                <div className="flex-middle" style={hiddenStyle}>
                    <p style={{fontSize: '3.5vmin'}}>
                        {winnerText}
                    </p>
                    <div className="center">
                        <Confetti config={confettiConfig} active={isGameFinished}/>
                    </div>
                </div>
                <Button color="primary" onClick={restartGame}>
                    Restart (icon)
                </Button>
            </>
        );
        // TODO move button to it's own component??? or somehow else make the logic better here...
        // because this component seems to be doing too much when it also restarts the game...

    }
}

const mapStateToProps = ( state: AppState ) => ({
    isGameFinished: state.game.isFinished,
    winner: state.game.winningPlayer,
});

// tslint:disable-next-line: no-any
const mapDispatchToProps = ( dispatch: any ) => ({
    restartGame: () =>
        dispatch( restartGame() )
});

export default connect( mapStateToProps, mapDispatchToProps )( GameFinishedDisplay );
