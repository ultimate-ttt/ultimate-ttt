import * as React from 'react';
import 'material-design-icons/iconfont/material-icons.css';
import { Player, TileValue } from '../../../state/AppState';
// import { XSymbol } from '../../symbols/XSymbol';
// import { OSymbol } from '../../symbols/OSymbol';
//import { NoWinnerSymbol } from '../../symbols/NoWinnerSymbol';
import './tile.css';

interface TileProps {
    onTileClicked: () => void;
    value: TileValue;
    currentPlayer: Player
}

interface TileState {
}

export class Tile extends React.Component<TileProps, TileState> {

    constructor( props: TileProps ) {
        super( props );

        // this.getValue = this.getValue.bind( this );
        // this.handleClick = this.handleClick.bind( this );
        // this.getRoundnessClass = this.getRoundnessClass.bind( this );
    }

    // getValue() {
    //     const {value, isSmallBoardFinished} = this.props;
    //
    //     if (value === TileValue.Cross) {
    //         return <XSymbol bigSymbol={isSmallBoardFinished!}/>;
    //     } else if (value === TileValue.Circle) {
    //         return <OSymbol bigSymbol={isSmallBoardFinished!}/>;
    //     } else if (value === TileValue.Destroyed) {
    //         return <NoWinnerSymbol/>;
    //     } else {
    //         return '';
    //     }
    // }
    //
    // handleClick() {
    //     const {
    //         bigBoardPoint, smallBoardPoint, player, value,
    //         onTileClicked, shouldDisplayIndicator
    //     } = this.props;
    //     if (onTileClicked) {
    //         onTileClicked( bigBoardPoint, smallBoardPoint!, player!, value!, shouldDisplayIndicator! );
    //     }
    // }
    //
    // getRoundnessClass() {
    //     const {player, isSmallBoardFinished, value} = this.props;
    //
    //     let isCircle;
    //     let isSquare;
    //     if (isSmallBoardFinished) {
    //         isCircle = value === TileValue.Circle;
    //         isSquare = value === TileValue.Cross;
    //     } else {
    //         isCircle = player === Player.Circle;
    //         isSquare = player === Player.Cross;
    //     }
    //
    //     if (isCircle) {
    //         return 'circle';
    //     } else if (isSquare) {
    //         return 'square';
    //     } else {
    //         return 'no-winner';
    //     }
    // }

    render() {
        const {value, onTileClicked} = this.props;
        //const tileValue = this.getValue();
        const color = 'indicator';//this.props.shouldDisplayIndicator ? 'indicator' : 'normal';
        const roundnessClass = 'circle';//this.getRoundnessClass();

        return (
            <div className={`box ${color} ${roundnessClass}`} onClick={onTileClicked}>
                {value}
            </div>
        );
    }
}