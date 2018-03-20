import * as React from 'react';
import './symbols.css';
import './symbolAnimations.css';
import * as classNames from 'classnames';

interface XSymbolProps {
    bigSymbol?: boolean;
    shouldAnimate?: boolean;
}

interface XSymbolState {
}

export class XSymbol extends React.Component<XSymbolProps, XSymbolState> {

    public static defaultProps: Partial<XSymbolProps> = {
        shouldAnimate: true
    };

    constructor( props: XSymbolProps ) {
        super( props );
    }

    render() {
        // TODO: is there a case where it shouldn't animate?
        const {bigSymbol, shouldAnimate} = this.props;
        var iconClass = classNames( {
                                        'material-icons x': true,
                                        'big-symbol': bigSymbol,
                                        'animate-x': shouldAnimate && !bigSymbol,
                                        'animate-x-big-symbol': shouldAnimate && bigSymbol
                                    } );
        return (
            <i className={iconClass}>clear</i>
        );
    }
}