import * as React from 'react';
import './symbols.css';
import './symbolAnimations.css';
import '../../fonts/icons.css';
import * as classNames from 'classnames';

interface XSymbolProps {
    bigSymbol?: boolean;
}

interface XSymbolState {
}

export class XSymbol extends React.Component<XSymbolProps, XSymbolState> {
    
    constructor( props: XSymbolProps ) {
        super( props );
    }

    render() {
        const {bigSymbol} = this.props;
        const iconClass = classNames( {
                                        'icon-x': true,
                                        'material-icons': true,
                                        'x': true,
                                        'big-symbol': bigSymbol,
                                        'animate-x': !bigSymbol,
                                        'animate-x-big-symbol': bigSymbol
                                    } );
        return (
            <i className={iconClass} />
        );
    }
}