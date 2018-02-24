import * as React from 'react';
import 'material-design-icons/iconfont/material-icons.css';
import { Player, TileValue } from '../../state/AppState';
import { XSymbol } from '../symbols/XSymbol';
import { OSymbol } from '../symbols/OSymbol';
import { Point } from '../../util/Point';
import { NoWinnerSymbol } from '../symbols/NoWinnerSymbol';

// TODO: Does this component have too many props?
interface TileProps {
    bigBoardPoint: Point; // Wouldn't need to know BigBoardPoint
    smallBoardPoint?: Point;
    onTileClicked?: ( bigBoard: Point, smallBoard: Point, player: Player, value: TileValue, allowed: boolean ) => void;
    value?: TileValue;
    player?: Player; // Wouldn't need to know player
    shouldDisplayIndicator?: boolean;
    isSmallBoardFinished?: boolean;
}

interface TileState {
}

export class Tile extends React.Component<TileProps, TileState> {

    public static defaultProps: Partial<TileProps> = {
        shouldDisplayIndicator: false,
        value: TileValue.Empty,
    };

    constructor( props: TileProps ) {
        super( props );

        this.getValue = this.getValue.bind( this );
        this.handleClick = this.handleClick.bind( this );
        this.getRoundnessClass = this.getRoundnessClass.bind( this );
    }

    getValue() {
        const {value, isSmallBoardFinished} = this.props;

        if (value === TileValue.Cross) {
            return <XSymbol bigSymbol={isSmallBoardFinished!}/>;
        } else if (value === TileValue.Circle) {
            return <OSymbol bigSymbol={isSmallBoardFinished!}/>;
        } else if (value === TileValue.Destroyed) {
            return <NoWinnerSymbol/>;
        } else {
            return '';
        }
    }

    handleClick() {
        const {
            bigBoardPoint, smallBoardPoint, player, value,
            onTileClicked, shouldDisplayIndicator
        } = this.props;
        if (onTileClicked) {
            onTileClicked( bigBoardPoint, smallBoardPoint!, player!, value!, shouldDisplayIndicator! );
        }
    }

    getRoundnessClass() {
        const {player, isSmallBoardFinished, value} = this.props;

        let isCircle;
        let isSquare;
        if (isSmallBoardFinished) {
            isCircle = value === TileValue.Circle;
            isSquare = value === TileValue.Cross;
        } else {
            isCircle = player === Player.Circle;
            isSquare = player === Player.Cross;
        }

        if (isCircle) {
            return 'circle';
        } else if (isSquare) {
            return 'square';
        } else {
            return '';
        }
    }

    render() {
        const tileValue = this.getValue();
        const color = this.props.shouldDisplayIndicator ? 'indicator' : 'normal';
        const roundnessClass = this.getRoundnessClass();

        return (
            <div className={`box ${color} ${roundnessClass}`} onClick={this.handleClick}>
                {tileValue}
            </div>
        );
    }
}