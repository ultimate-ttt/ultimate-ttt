import * as React from 'react';
import './symbols.css';
import './symbolAnimations.css';
import * as classNames from 'classnames';

interface OSymbolProps {
    bigSymbol?: boolean;
}

interface OSymbolState {
}

export class OSymbol extends React.Component<OSymbolProps, OSymbolState> {
    constructor( props: OSymbolProps ) {
        super( props );
    }

    render() {
        const {bigSymbol} = this.props;
        var iconClass = classNames( {
                                        'material-icons o': true,
                                        'big-symbol': bigSymbol,
                                        'animate-o': !bigSymbol,
                                        'animate-o-big-symbol': bigSymbol
                                    } );

        return (
            <i className={iconClass}>panorama_fish_eye</i>
        );
    }
}