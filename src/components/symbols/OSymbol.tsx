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
    cssClasses?: string;
}

export class OSymbol extends React.Component<OSymbolProps> {
    public static defaultProps: Partial<OSymbolProps> = {
        shouldAnimate: true
    };

    constructor( props: OSymbolProps ) {
        super( props );
    }

    render() {
        const {bigSymbol, shouldAnimate, style, cssClasses} = this.props;
        const iconClass = classNames( {
                                          'icon-o': true,
                                          'o': true,
                                          'big-symbol': bigSymbol,
                                          'animate-o': shouldAnimate
                                      } );

        return (
            <i style={style} className={iconClass + ' ' + cssClasses} aria-label="Circle Symbol"/>
        );
    }
}