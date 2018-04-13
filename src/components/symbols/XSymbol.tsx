import * as React from 'react';
import './symbols.css';
import './symbolAnimations.css';
import '../../fonts/icons.css';
import * as classNames from 'classnames';
import { CSSProperties } from 'react';

interface XSymbolProps {
    bigSymbol?: boolean;
    shouldAnimate?: boolean;
    style?: CSSProperties;
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
        const {bigSymbol, shouldAnimate, style} = this.props;
        const iconClass = classNames( {
                                        'icon-x': true,
                                        'material-icons': true,
                                        'x': true,
                                        'big-symbol': bigSymbol,
                                        'animate-x': !bigSymbol && shouldAnimate,
                                        'animate-x-big-symbol': bigSymbol && shouldAnimate
                                    } );
        return (
            <i style={style} className={iconClass} aria-label="Cross Symbol" />
        );
    }
}