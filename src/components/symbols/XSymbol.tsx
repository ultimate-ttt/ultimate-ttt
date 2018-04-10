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

// TODO add new tests
export class XSymbol extends React.Component<XSymbolProps, XSymbolState> {
    public static defaultProps: Partial<XSymbolProps> = {
        shouldAnimate: true
    };

    constructor( props: XSymbolProps ) {
        super( props );
    }

    render() {
        const {bigSymbol, shouldAnimate} = this.props;
        var iconClass = classNames( {
                                        'material-icons x': true,
                                        'big-symbol': bigSymbol,
                                        'animate-x': !bigSymbol && shouldAnimate,
                                        'animate-x-big-symbol': bigSymbol && shouldAnimate
                                    } );
        return (
            <i className={iconClass}>clear</i>
        );
    }
}