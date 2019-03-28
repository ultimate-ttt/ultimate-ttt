import * as React from 'react';
import './symbols.css';
import './symbolAnimations.css';
import '../../fonts/icons.css';
import * as classNames from 'classnames';

interface XSymbolProps {
    bigSymbol?: boolean;
    shouldAnimate?: boolean;
    className?: string;
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
        const {bigSymbol, shouldAnimate, className} = this.props;
        const iconClass = classNames( {
                                          'icon-x': true,
                                          'x': true,
                                          'big-symbol': bigSymbol,
                                          'animate-x': shouldAnimate,
                                          className: className
                                      } );
        return (
            <i className={iconClass} aria-label="Cross Symbol"/>
        );
    }
}