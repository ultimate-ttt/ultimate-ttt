import * as React from 'react';

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
        const bigSymbolClass = this.props.bigSymbol ? 'big-symbol' : '';
        let animateClass = this.props.shouldAnimate ? 'animate-o' : '';
        if (animateClass.length > 0 && this.props.bigSymbol) {
            animateClass += `-${bigSymbolClass}`;
        }

        return (
            <i className={`material-icons o ${bigSymbolClass} ${animateClass}`}>panorama_fish_eye</i>
        );
    }
}