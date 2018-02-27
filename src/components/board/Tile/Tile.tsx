import * as React from 'react';
import 'material-design-icons/iconfont/material-icons.css';
import { TileValue } from '../../../state/AppState';
// import { XSymbol } from '../../symbols/XSymbol';
// import { OSymbol } from '../../symbols/OSymbol';
// import { NoWinnerSymbol } from '../../symbols/NoWinnerSymbol';
import './tile.css';
import { XSymbol } from '../../symbols/XSymbol';
import { OSymbol } from '../../symbols/OSymbol';
import { NoWinnerSymbol } from '../../symbols/NoWinnerSymbol';



interface TileProps {
    onTileClicked: () => void;
    value: TileValue;
    isCircle: boolean;
    isClickable: boolean;
}

interface TileState {
}

export class Tile extends React.Component<TileProps, TileState> {

    constructor( props: TileProps ) {
        super( props );

        this.getValue = this.getValue.bind(this);
    }

    getValue() {
        switch(this.props.value){
            case TileValue.Cross:
                return <XSymbol/>;
            case TileValue.Circle:
                return <OSymbol/>;
            case TileValue.Empty:
                return '';
            case TileValue.Destroyed:
                return <NoWinnerSymbol/>;
        }
    }
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
        const {onTileClicked, isCircle, isClickable} = this.props;
        const color = isClickable ? 'indicator' : 'normal';
        const roundness = isCircle ? 'circle' : 'square';
        return (
            <div className={`box ${color} ${roundness}`} onClick={onTileClicked}>
                {this.getValue()}
            </div>
        );
    }
}