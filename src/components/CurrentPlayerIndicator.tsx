import * as React from 'react';
import { XSymbol } from './symbols/XSymbol';
import { OSymbol } from './symbols/OSymbol';

interface CurrentPlayerIndicatorProps {
    isCross?: boolean;
    isCircle?: boolean;
    isFinished?: boolean;
}

interface CurrentPlayerIndicatorState {
}

export class CurrentPlayerIndicator extends React.Component<CurrentPlayerIndicatorProps, CurrentPlayerIndicatorState> {

    public static defaultProps: Partial<CurrentPlayerIndicatorProps> = {
        isFinished: false,
    };

    constructor( props: CurrentPlayerIndicatorProps ) {
        super( props );
    }

    getIcon() {
        const {isCross, isCircle, isFinished} = this.props;

        if (isFinished) {
            return '';
        } else if (isCross) {
            return <XSymbol shouldAnimate={false}/>;
        } else if (isCircle) {
            return <OSymbol shouldAnimate={false}/>;
        } else {
            return 'ERROR';
        }
    }

    render() {
        const currentPlayerText = this.props.isFinished ? '' : 'Current Player:';
        return (
            <div className="pad-bottom text-center flex-center">
                {currentPlayerText} {this.getIcon()}
            </div>
        );
    }
}