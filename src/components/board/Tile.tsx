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

    render() {
        const tileValue = this.getValue();
        const color = this.props.shouldDisplayIndicator ? 'indicator' : 'normal';

        return (
            <div className={'box ' + color} onClick={this.handleClick}>
                {tileValue}
            </div>
        );
    }
}