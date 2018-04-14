import * as React from 'react';
import './symbols.css';
import './symbolAnimations.css';
import '../../fonts/icons.css';
import * as classNames from 'classnames';
import { CSSProperties } from 'react';

interface OSymbolProps {
    bigSymbol?: boolean;
    shouldAnimate?: boolean;
    style?: CSSProperties;
}

interface OSymbolState {
}

export class OSymbol extends React.Component<OSymbolProps, OSymbolState> {
    public static defaultProps: Partial<OSymbolProps> = {
        shouldAnimate: true
    };

    constructor( props: OSymbolProps ) {
        super( props );
    }

    render() {
        const {bigSymbol, shouldAnimate, style} = this.props;
        const iconClass = classNames( {
                                        'icon-o': true,
                                        'material-icons': true,
                                        'o': true,
                                        'big-symbol': bigSymbol,
                                        'animate-o': !bigSymbol && shouldAnimate,
                                        'animate-o-big-symbol': bigSymbol && shouldAnimate
                                    } );

        return (
            <i style={style} className={iconClass} aria-label="Circle Symbol" />
        );
    }
}