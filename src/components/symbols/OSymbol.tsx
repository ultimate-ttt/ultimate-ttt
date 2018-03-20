import * as React from 'react';
import './symbols.css';
import './symbolAnimations.css';
import * as classNames from 'classnames';

interface OSymbolProps {
    bigSymbol?: boolean;
    shouldAnimate?: boolean;
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
        // TODO: is there a case where it shouldn't animate?
        const {bigSymbol, shouldAnimate} = this.props;
        var iconClass = classNames({
                                        'material-icons o': true,
                                        'big-symbol': bigSymbol,
                                        'animate-o': shouldAnimate && !bigSymbol,
                                        'animate-o-big-symbol': shouldAnimate && bigSymbol
                                      });

        return (
            <i className={iconClass}>panorama_fish_eye</i>
        );
    }
}