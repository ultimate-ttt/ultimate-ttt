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

    shouldComponentUpdate(nextProps: XSymbolProps) {
        const differentSize = this.props.bigSymbol !== nextProps.bigSymbol;
        const differentStyle = this.props.style !== nextProps.style;
        return differentSize || differentStyle;
    }

    render() {
        const {bigSymbol, shouldAnimate, style} = this.props;
        const iconClass = classNames( {
                                        'icon-x': true,
                                        'x': true,
                                        'big-symbol': bigSymbol,
                                        'animate-x': shouldAnimate,
                                    } );
        return (
            <i style={style} className={iconClass} aria-label="Cross Symbol" />
        );
    }
}