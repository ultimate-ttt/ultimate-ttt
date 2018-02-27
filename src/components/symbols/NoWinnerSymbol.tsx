import * as React from 'react';
import './symbols.css';
import './symbolAnimations.css';
import * as classNames from 'classnames';

interface NoWinnerSymbolProps {
}

interface NoWinnerSymbolState {
}

export class NoWinnerSymbol extends React.Component<NoWinnerSymbolProps, NoWinnerSymbolState> {

    constructor( props: NoWinnerSymbolProps ) {
        super( props );
    }

    render() {
        var iconClass = classNames({
                                       'material-icons': true,
                                       'big-symbol': true,
                                       'no-winner': true,
                                       'animate-no-winner-big-symbol': true
                                   });
        return (
            <i className={iconClass}>remove</i>
        );
    }
}